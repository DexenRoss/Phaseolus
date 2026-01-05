import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { getTransporter, inviteEmailHtml } from "@/lib/mailer";
import { Role } from "@prisma/client";

function sha256hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function tokenBase64Url(bytes = 32) {
  // Node 20: base64url disponible
  return crypto.randomBytes(bytes).toString("base64url");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Si ya existe usuario con ese email, no invitamos
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Ese correo ya tiene cuenta" }, { status: 409 });
    }

    // Invalida invitaciones activas anteriores (no usadas)
    await prisma.collaboratorInvite.updateMany({
      where: { email, usedAt: null },
      data: { usedAt: new Date() }, // las marcamos como usadas/invalidas
    });

    const rawToken = tokenBase64Url(32);
    const tokenHash = sha256hex(rawToken);

    const expiresHours = Number(process.env.INVITE_EXPIRES_HOURS || "48");
    const expiresAt = new Date(Date.now() + expiresHours * 60 * 60 * 1000);

    await prisma.collaboratorInvite.create({
      data: {
        email,
        tokenHash,
        expiresAt,
        role: Role.COLLABORATOR,
      },
    });

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const inviteUrl =
      `${appUrl}/register/collaborator?token=${rawToken}&email=${encodeURIComponent(email)}`;

    const from = process.env.SMTP_FROM || "Phaseolus <no-reply@phaseolus.local>";
    const transporter = getTransporter();

    await transporter.sendMail({
      from,
      to: email,
      subject: "Invitación para crear cuenta de colaborador",
      text: `Te invitaron como colaborador. Abre este enlace (expira en ${expiresHours} horas): ${inviteUrl}`,
      html: inviteEmailHtml({ appUrl, inviteUrl, expiresHours }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error enviando invitación" }, { status: 500 });
  }
}
