import { db } from "@/lib/db";
import { locations } from "@/migrations/schema";
export type InsertLocationRequest = typeof locations.$inferInsert;

export async function POST(request: Request) {
  const body: InsertLocationRequest = await request.json();
  const result = await db.insert(locations).values(body);
  console.log(result);
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function GET() {
  const locs = await db.select().from(locations).execute();
  return new Response(JSON.stringify(locs), {
    headers: {
      "content-type": "application/json",
    },
  });
}
