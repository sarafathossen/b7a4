import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import pg from 'pg';

import { PrismaClient } from "@prisma/client"; 

const connectionString = process.env.DATABASE_URL || "postgres://7a3a6bf07ce885988302315c37bf93b8ce3e3ba7b91ad7991d548f3dcc2230cc:sk_uDX_G0Tq92dQ2PJSFhg9l@pooled.db.prisma.io:5432/postgres?sslmode=require";

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);


export const prisma = new PrismaClient({ adapter }) as any;

export default prisma;