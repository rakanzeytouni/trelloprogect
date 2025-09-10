import { PrismaClient } from "@/generated/prisma";
const globalforprisma=global as unknown as {
    prisma:PrismaClient;
};
const prisma=globalforprisma.prisma|| new PrismaClient();
if (process.env.NODE_ENV!=="production")globalforprisma.prisma=prisma;
export default prisma;