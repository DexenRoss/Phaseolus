import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";
import { getTransporter, inviteEmailHtml } from "@/lib/mailer";
import { randomTokenBase64Url } from "@/lib/tokens";
import { InvitationStatus, UserRole } from "@/generated/prisma/client";

export async function POST(req: Request) {
  try {
    const session = await getCurrentSession();
    if (!session) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    if (session.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

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

    await prisma.invitation.updateMany({
      where: { email, status: InvitationStatus.PENDING },
      data: { status: InvitationStatus.REVOKED },
    });

    const rawToken = randomTokenBase64Url(32);

    const expiresHours = Number(process.env.INVITE_EXPIRES_HOURS || "48");
    const expiresAt = new Date(Date.now() + expiresHours * 60 * 60 * 1000);

    await prisma.invitation.create({
      data: {
        email,
        token: rawToken,
        expiresAt,
        role: UserRole.COLLABORATOR,
        status: InvitationStatus.PENDING,
        invitedById: session.sub,
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
  } catch (err: unknown) {
    // Imprime el error completo en consola
    console.error("[INVITE ERROR]", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    let errorMsg = "Error enviando invitación";
    if (err instanceof Error && err.message) errorMsg += ": " + err.message;
    if (err instanceof Error && err.stack) errorMsg += "\n" + err.stack;
    errorMsg += "\n" + JSON.stringify(err, Object.getOwnPropertyNames(err), 2);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
