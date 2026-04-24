import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserStatus } from "@/generated/prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = (url.searchParams.get("token") || "").trim();

  if (!token) {
    return NextResponse.json({ ok: false, error: "Token inválido" }, { status: 400 });
  }

  const record = await prisma.emailVerificationToken.findUnique({
    where: { token },
  });

  if (!record || record.expiresAt <= new Date()) {
    return NextResponse.json({ ok: false, error: "Link inválido o expirado" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.user.updateMany({
      where: { email: record.email },
      data: {
        emailVerifiedAt: new Date(),
        status: UserStatus.ACTIVE,
      },
    }),
    prisma.emailVerificationToken.delete({
      where: { id: record.id },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
