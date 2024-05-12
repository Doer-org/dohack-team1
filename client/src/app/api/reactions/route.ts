import { db } from "@/lib/db";
import { reactions } from "@/migrations/schema";
export type InsertLocationRequest = typeof reactions.$inferInsert;
// POST: /api/reactions
export async function POST(request: Request) {
  const body: InsertLocationRequest = await request.json();
  const result = await db.insert(reactions).values(body);
  console.log(result);
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json",
    },
  });
}
// GET: /api/reactions
export async function GET() {
  const locs = await db.select().from(reactions).execute();
  return new Response(JSON.stringify(locs), {
    headers: {
      "content-type": "application/json",
    },
  });
}
