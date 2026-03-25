import bcrypt from "bcrypt";
import { PrismaClient, UserRole, UserStatus } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "127.0.0.1",
  port: 3306,
  user: "phaseolus_user",
  password: "phaseolus_pass",
  database: "phaseolus",
  allowPublicKeyRetrieval: true,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Iniciando seed...");

  const adminPasswordHash = await bcrypt.hash("Admin1234*", 10);
  const collaboratorPasswordHash = await bcrypt.hash("Collaborator1234*", 10);
  const userPasswordHash = await bcrypt.hash("User1234*", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@phaseolus.local" },
    update: {},
    create: {
      name: "Phaseolus Admin",
      email: "admin@phaseolus.local",
      username: "admin",
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerifiedAt: new Date(),
    },
  });

  const collaborator = await prisma.user.upsert({
    where: { email: "collab@phaseolus.local" },
    update: {},
    create: {
      name: "Phaseolus Collaborator",
      email: "collab@phaseolus.local",
      username: "collaborator",
      passwordHash: collaboratorPasswordHash,
      role: UserRole.COLLABORATOR,
      status: UserStatus.ACTIVE,
      emailVerifiedAt: new Date(),
    },
  });

  const basicUser = await prisma.user.upsert({
    where: { email: "user@phaseolus.local" },
    update: {},
    create: {
      name: "Phaseolus User",
      email: "user@phaseolus.local",
      username: "user",
      passwordHash: userPasswordHash,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      emailVerifiedAt: new Date(),
    },
  });

  await prisma.invitation.upsert({
    where: { token: "invite-seed-token-001" },
    update: {},
    create: {
      email: "newcollab@phaseolus.local",
      role: UserRole.COLLABORATOR,
      token: "invite-seed-token-001",
      status: "PENDING",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      invitedById: admin.id,
    },
  });

  const publication = await prisma.publication.upsert({
    where: { slug: "seed-publication-phaseolus-v1" },
    update: {},
    create: {
      title: "Phaseolus Seed Publication",
      slug: "seed-publication-phaseolus-v1",
      abstract: "Publicación inicial de prueba para el sistema Phaseolus.",
      journal: "Phaseolus Journal",
      doi: "10.0000/phaseolus.seed.v1",
      publicationDate: new Date("2025-01-15"),
      status: "PUBLISHED",
      createdById: admin.id,
    },
  });

  const author = await prisma.author.upsert({
    where: { orcid: "0000-0000-0000-0001" },
    update: {},
    create: {
      fullName: "Dr. Seed Author",
      orcid: "0000-0000-0000-0001",
      affiliation: "Phaseolus Lab",
      email: "author@phaseolus.local",
    },
  });

  await prisma.publicationAuthor.upsert({
    where: {
      publicationId_authorId: {
        publicationId: publication.id,
        authorId: author.id,
      },
    },
    update: {},
    create: {
      publicationId: publication.id,
      authorId: author.id,
      authorOrder: 1,
      isCorresponding: true,
    },
  });

  const dataset = await prisma.dataset.upsert({
    where: { slug: "seed-dataset-phaseolus-v1" },
    update: {},
    create: {
      name: "Seed Dataset Phaseolus",
      slug: "seed-dataset-phaseolus-v1",
      description: "Dataset inicial de prueba para validar módulos del sistema.",
      sourceType: "MANUAL_UPLOAD",
      filePath: "/datasets/seed-dataset.csv",
      storageProvider: "LOCAL",
      status: "READY",
      isPublished: true,
      createdById: admin.id,
      publicationId: publication.id,
    },
  });

  await prisma.metadataRecord.create({
    data: {
      entityType: "DATASET",
      entityId: dataset.id,
      key: "species",
      value: "Phaseolus vulgaris",
      createdById: admin.id,
      datasetId: dataset.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "CREATE",
      entityType: "SYSTEM_SEED",
      entityId: admin.id,
      description: "Seed inicial ejecutado correctamente",
      actorId: admin.id,
    },
  });

  console.log("✅ Seed completado");
  console.log("Admin:", admin.email, " / password: Admin1234*");
  console.log("Collaborator:", collaborator.email, " / password: Collaborator1234*");
  console.log("User:", basicUser.email, " / password: User1234*");
}

main()
  .catch((error) => {
    console.error("❌ Error en seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });