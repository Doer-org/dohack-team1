import { env } from "@/constants/env";
import type { Config } from "drizzle-kit";

// https://orm.drizzle.team/kit-docs/commands
export default {
  out: "./src/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DB_URL,
  },
} satisfies Config;
