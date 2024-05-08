"server only";
import { env } from "@/constants/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(env.DB_URL);
export const db = drizzle(client, { logger: true });
