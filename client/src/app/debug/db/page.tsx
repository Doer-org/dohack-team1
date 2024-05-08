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
    </div>
  );
}
