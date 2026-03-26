import { prisma } from "@/lib/prisma";

export async function getAllAuthors() {
  return prisma.author.findMany({
    orderBy: {
      fullName: "asc",
    },
    select: {
      id: true,
      fullName: true,
      orcid: true,
      affiliation: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          publications: true,
        },
      },
    },
  });
}

export async function createAuthor(data: {
  fullName: string;
  orcid?: string;
  affiliation?: string;
  email?: string;
}) {
  return prisma.author.create({
    data: {
      fullName: data.fullName,
      orcid: data.orcid || null,
      affiliation: data.affiliation || null,
      email: data.email || null,
    },
  });
}