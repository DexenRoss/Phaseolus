import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { randomTokenBase64Url, sha256hex } from "@/lib/tokens";
import { getTransporter, verifyEmailHtml } from "@/lib/mailer";
import { Role } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body?.email || "").trim().toLowerCase();
    const inviteToken = String(body?.inviteToken || "").trim();

    const firstName = String(body?.firstName || "").trim();
    const lastName = String(body?.lastName || "").trim();
    const password = String(body?.password || "");

    if (!email || !inviteToken || !firstName || !lastName || !password) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    // 1) Validar invitación (token hasheado + no usado + no expirado)
    const invite = await prisma.collaboratorInvite.findFirst({
      where: {
        email,
        tokenHash: sha256hex(inviteToken),
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!invite) {
      return NextResponse.json({ error: "Invitación inválida o expirada" }, { status: 400 });
    }

    // 2) No permitir que ya exista user con ese email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Ese correo ya tiene cuenta" }, { status: 409 });
    }

    // 3) Crear usuario colaborador + marcar invite usada + crear token confirmación
    const passwordHash = await bcrypt.hash(password, 10);

    const verifyToken = randomTokenBase64Url(32);
    const verifyHash = sha256hex(verifyToken);

    const verifyHours = Number(process.env.EMAIL_VERIFY_EXPIRES_HOURS || "24");
    const verifyExpiresAt = new Date(Date.now() + verifyHours * 60 * 60 * 1000);

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const verifyUrl = `${appUrl}/verify-email?token=${verifyToken}`;

    const from = process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@example.com";
    const transporter = getTransporter();

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          email,
          passwordHash,
          role: Role.COLLABORATOR,
          organization: invite.role ? "Default" : null, // ajusta si guardas org en invite
          isActive: true,
        },
        select: { id: true },
      });

      await tx.collaboratorInvite.update({
        where: { id: invite.id },
        data: { usedAt: new Date() },
      });

      await tx.emailVerificationToken.create({
        data: {
          userId: user.id,
          tokenHash: verifyHash,
          expiresAt: verifyExpiresAt,
        },
      });
    });

    // 4) Enviar correo de confirmación
    await transporter.sendMail({
      from,
      to: email,
      subject: "Confirma tu correo para activar tu cuenta",
      text: `Confirma tu correo aquí (expira en ${verifyHours} horas): ${verifyUrl}`,
      html: verifyEmailHtml({ appUrl, verifyUrl, expiresHours: verifyHours }),
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    // Email duplicado (por unique)
    if (String(e?.code) === "P2002") {
      return NextResponse.json({ error: "Email ya registrado" }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: "Error registrando colaborador" }, { status: 500 });
  }
}
