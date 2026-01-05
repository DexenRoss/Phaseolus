import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sha256hex } from "@/lib/tokens";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = (url.searchParams.get("token") || "").trim();

  if (!token) {
    return NextResponse.json({ ok: false, error: "Token inválido" }, { status: 400 });
  }

  const tokenHash = sha256hex(token);

  const record = await prisma.emailVerificationToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
  });

  if (!record) {
    return NextResponse.json({ ok: false, error: "Link inválido o expirado" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { emailVerifiedAt: new Date() },
    }),
    prisma.emailVerificationToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
