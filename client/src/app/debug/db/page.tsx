"use client";
import { locations } from "@/migrations/schema";
import { useEffect, useState } from "react";
import { InsertForm } from "./_components/insert-form";

type Location = typeof locations.$inferSelect;
const getLocations = async () => {
  const r = await fetch("/api/locations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const locs = (await r.json()) as Location[];
  return locs;
};

type InsertLocationRequest = typeof locations.$inferInsert;
const insertApi = (r: InsertLocationRequest) => {
  return fetch("/api/locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(r),
  });
};

export default function Page() {
  const [locations, setLocations] = useState<Location[]>([]);
  useEffect(() => {
    const locs = getLocations();
    locs.then((locs) => {
      setLocations(locs);
    });
  }, []);
  return (
    <>
      {locations.map((location) => (
        <div key={location.locationId}>
          {location.locationId}: {location.prefecture} {location.city}
        </div>
      ))}
      <InsertForm
        onSubmit={async (id) => {
          const newLoc = {
            locationId: id,
            prefecture: "tttt",
            city: "cccc",
          };
          const resp = await insertApi(newLoc);
          if (resp.ok) {
            setLocations([...locations, newLoc]);
          }
        }}
      />
    </>
  );
}
