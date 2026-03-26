import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcrypt";

export async function getAllInvitations() {
  return prisma.invitation.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      expiresAt: true,
      createdAt: true,
      token: true, // no need to fetch the token here
    },
  });
}

export async function createInvitation({
  email,
  role,
  invitedById,
}: {
  email: string;
  role: "ADMIN" | "COLLABORATOR" | "USER";
  invitedById: string;
}) {
  const token = crypto.randomBytes(32).toString("hex");

  return prisma.invitation.create({
    data: {
      email,
      role,
      token,
      status: "PENDING",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      invitedById,
    },
  });
}

export async function getInvitationByToken(token: string) {
  return prisma.invitation.findUnique({
    where: { token },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      expiresAt: true,
      token: true,
    },
  });
}

export async function acceptInvitation({
  token,
  name,
  username,
  password,
}: {
  token: string;
  name: string;
  username: string;
  password: string;
}) {
  const invitation = await prisma.invitation.findUnique({
    where: { token },
  });

  if (!invitation) {
    throw new Error("INVITATION_NOT_FOUND");
  }

  if (invitation.status !== "PENDING") {
    throw new Error("INVITATION_NOT_AVAILABLE");
  }

  if (new Date(invitation.expiresAt) < new Date()) {
    throw new Error("INVITATION_EXPIRED");
  }

  const existingUserByEmail = await prisma.user.findUnique({
    where: { email: invitation.email },
  });

  if (existingUserByEmail) {
    throw new Error("EMAIL_ALREADY_REGISTERED");
  }

  const existingUserByUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUserByUsername) {
    throw new Error("USERNAME_ALREADY_TAKEN");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email: invitation.email,
      username,
      passwordHash,
      role: invitation.role,
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
    },
  });

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: {
      status: "ACCEPTED",
      acceptedAt: new Date(),
      acceptedById: user.id,
    },
  });

  return user;
}