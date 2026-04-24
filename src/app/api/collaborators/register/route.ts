import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { randomTokenBase64Url } from "@/lib/tokens";
import { getTransporter, verifyEmailHtml } from "@/lib/mailer";
import { InvitationStatus, UserRole, UserStatus } from "@/generated/prisma/client";

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

    const invite = await prisma.invitation.findFirst({
      where: {
        email,
        token: inviteToken,
        status: InvitationStatus.PENDING,
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

    const passwordHash = await bcrypt.hash(password, 10);

    const verifyToken = randomTokenBase64Url(32);
    const verifyHours = Number(process.env.EMAIL_VERIFY_EXPIRES_HOURS || "24");
    const verifyExpiresAt = new Date(Date.now() + verifyHours * 60 * 60 * 1000);

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const verifyUrl = `${appUrl}/verify-email?token=${verifyToken}`;

    const from = process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@example.com";
    const transporter = getTransporter();

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: `${firstName} ${lastName}`.trim(),
          email,
          passwordHash,
          role: UserRole.COLLABORATOR,
          status: UserStatus.PENDING_VERIFICATION,
        },
        select: { id: true, email: true },
      });

      await tx.invitation.update({
        where: { id: invite.id },
        data: {
          status: InvitationStatus.ACCEPTED,
          acceptedAt: new Date(),
          acceptedById: user.id,
        },
      });

      await tx.emailVerificationToken.create({
        data: {
          email: user.email,
          token: verifyToken,
          expiresAt: verifyExpiresAt,
        },
      });
    });

    await transporter.sendMail({
      from,
      to: email,
      subject: "Confirma tu correo para activar tu cuenta",
      text: `Confirma tu correo aquí (expira en ${verifyHours} horas): ${verifyUrl}`,
      html: verifyEmailHtml({ appUrl, verifyUrl, expiresHours: verifyHours }),
    });

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    // Email duplicado (por unique)
    if (typeof e === "object" && e !== null && "code" in e && String(e.code) === "P2002") {
      return NextResponse.json({ error: "Email ya registrado" }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: "Error registrando colaborador" }, { status: 500 });
  }
}
