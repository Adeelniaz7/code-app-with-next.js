console.log('PRISMA MODULE LOADED');
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL;
  let dbPath = "dev.db";
  
  if (url && typeof url === 'string') {
    dbPath = url.startsWith("file:") ? url.slice(5) : url;
  }
  
  const absolutePath = path.resolve(process.cwd(), dbPath);
  
  const adapter = new PrismaBetterSqlite3({
    url: absolutePath,
  });
  
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prisma_instance: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prisma_instance ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma_instance = prisma;