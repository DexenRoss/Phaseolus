import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "phaseolus_user",
  password: process.env.DB_PASSWORD || "phaseolus_pass",
  database: process.env.DB_NAME || "phaseolus",
  allowPublicKeyRetrieval: true,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
