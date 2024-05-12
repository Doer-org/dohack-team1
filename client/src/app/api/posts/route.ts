import { db } from "@/lib/db";
import { posts } from "@/migrations/schema";
export type InsertLocationRequest = typeof posts.$inferInsert;
// POST: /api/posts
export async function POST(request: Request) {
  const body: InsertLocationRequest = await request.json();
  const result = await db.insert(posts).values(body);
  console.log(result);
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json",
    },
  });
}
// GET: /api/posts
export async function GET() {
  const locs = await db.select().from(posts).execute();
  return new Response(JSON.stringify(locs), {
    headers: {
      "content-type": "application/json",
    },
  });
}
