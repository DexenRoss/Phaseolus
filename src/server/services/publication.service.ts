import { prisma } from "@/lib/prisma";

export async function getAllPublications() {
  return prisma.publication.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      journal: true,
      doi: true,
      publicationDate: true,
      status: true,
      createdAt: true,
      createdBy: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      authors: {
        orderBy: {
          authorOrder: "asc",
        },
        select: {
          id: true,
          authorOrder: true,
          isCorresponding: true,
          author: {
            select: {
              id: true,
              fullName: true,
              orcid: true,
            },
          },
        },
      },
    },
  });
}

export async function createPublication(data: {
  title: string;
  slug: string;
  abstract?: string;
  journal?: string;
  doi?: string;
  publicationDate?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdById: string;
  authorIds: string[];
}) {
  const uniqueAuthorIds = [...new Set(data.authorIds)].filter(Boolean);

  return prisma.publication.create({
    data: {
      title: data.title,
      slug: data.slug,
      abstract: data.abstract || null,
      journal: data.journal || null,
      doi: data.doi || null,
      publicationDate: data.publicationDate
        ? new Date(data.publicationDate)
        : null,
      status: data.status,
      createdById: data.createdById,
      authors: {
        create: uniqueAuthorIds.map((authorId, index) => ({
          authorId,
          authorOrder: index + 1,
          isCorresponding: index === 0,
        })),
      },
    },
    include: {
      authors: {
        include: {
          author: true,
        },
      },
    },
  });
}

export async function getPublicationById(id: string) {
  return prisma.publication.findUnique({
    where: { id },
    include: {
      authors: {
        include: {
          author: true,
        },
      },
    },
  });
}

export async function updatePublication(data: {
  id: string;
  title: string;
  slug: string;
  abstract?: string;
  journal?: string;
  doi?: string;
  publicationDate?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  authorIds: string[];
}) {
  const uniqueAuthorIds = [...new Set(data.authorIds)].filter(Boolean);

  return prisma.publication.update({
    where: { id: data.id },
    data: {
      title: data.title,
      slug: data.slug,
      abstract: data.abstract || null,
      journal: data.journal || null,
      doi: data.doi || null,
      publicationDate: data.publicationDate
        ? new Date(data.publicationDate)
        : null,
      status: data.status,
      authors: {
        deleteMany: {}, // elimina relaciones anteriores
        create: uniqueAuthorIds.map((authorId, index) => ({
          authorId,
          authorOrder: index + 1,
          isCorresponding: index === 0,
        })),
      },
    },
  });
}

export async function deletePublication(id: string) {
  return prisma.publication.delete({
    where: { id },
  });
}