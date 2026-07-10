import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import pg from 'pg';
// কাস্টম পাথের বদলে ডিফল্ট প্রিজমা ক্লায়েন্ট ইম্পোর্ট করুন
import { PrismaClient } from "@prisma/client"; 

const connectionString = process.env.DATABASE_URL || "postgres://7a3a6bf07ce885988302315c37bf93b8ce3e3ba7b91ad7991d548f3dcc2230cc:sk_uDX_G0Tq92dQ2PJSFhg9l@pooled.db.prisma.io:5432/postgres?sslmode=require";

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// যেকোনো একটি এক্সপোর্ট রাখুন (আমরা Named Export রাখছি কারণ আপনার সার্ভিসে এটিই ইম্পোর্ট করা)
export const prisma = new PrismaClient({ adapter }) as any;
// src/lib/prisma.ts ফাইলের নিচে এটি যোগ করুন:
export default prisma;