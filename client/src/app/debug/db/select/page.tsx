import { db } from "@/lib/db";
import { locations } from "@/migrations/schema";

export default async function Page() {
  const allLocations = await db.select().from(locations).execute();
  return (
    <div>
      <h1>Debug</h1>
      <p>Debugging the app</p>
      {allLocations.map((location) => (
        <div key={location.locationId}>
          {location.locationId}: {location.prefecture} {location.city}
        </div>
      ))}
      <a href="/debug/db/select"> select</a>
      <br></br>
      <a href="/debug/db/insert">insert</a>
    </div>
  );
}
