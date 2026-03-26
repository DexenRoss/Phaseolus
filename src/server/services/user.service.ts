import { prisma } from "@/lib/prisma";

export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
}