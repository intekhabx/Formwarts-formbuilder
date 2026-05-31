import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "./env";
import { neon } from "@neondatabase/serverless";

// export const db = drizzle(env.DATABASE_URL);
const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql);
export * from "drizzle-orm";
export default db;
