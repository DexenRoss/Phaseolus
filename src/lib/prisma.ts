import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function getDatabaseConfig() {
  const databaseUrl = process.env.DATABASE_URL;

  if (process.env.DB_HOST || !databaseUrl) {
    return {
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER || "phaseolus_user",
      password: process.env.DB_PASSWORD || "phaseolus_pass",
      database: process.env.DB_NAME || "phaseolus",
    };
  }

  const url = new URL(databaseUrl);
  return {
    host: url.hostname,
    port: Number(url.port || "3306"),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
  };
}

const databaseConfig = getDatabaseConfig();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  adapter: PrismaMariaDb | undefined;
};

const adapter =
  globalForPrisma.adapter ??
  new PrismaMariaDb({
    ...databaseConfig,
    allowPublicKeyRetrieval: true,
  });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.adapter = adapter;
}
