// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Ensure we don't create multiple clients in development
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // optional, helpful for debugging
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
