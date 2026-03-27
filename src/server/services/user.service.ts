import { prisma } from "@/lib/prisma";
import { AppRole } from "@/lib/permissions";

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

export async function updateUserRole(id: string, role: AppRole) {
  return prisma.user.update({
    where: { id },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}