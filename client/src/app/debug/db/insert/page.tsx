"use client";

import { locations } from "@/migrations/schema";

type InsertLocationRequest = typeof locations.$inferInsert;
const insertApi = (r: InsertLocationRequest) => {
  fetch("/api/locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(r),
  });
};

const InsertForm = ({ onSubmit }: { onSubmit: (id: string) => void }) => {
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const contents = form.get("contents")?.toString() || "";
          onSubmit(contents);
        }}
      >
        <input type="text" name="contents" />
        <button type="submit">Insert</button>
      </form>
    </>
  );
};

export default function Page() {
  return (
    <div>
      <h1>Debug</h1>
      <p>Debugging the app</p>
      <InsertForm
        onSubmit={(id) =>
          insertApi({
            locationId: id,
            prefecture: "test",
            city: "city",
          })
        }
      />
      <a href="/debug/db/select"> select</a>
      <br></br>
      <a href="/debug/db/insert">insert</a>
    </div>
  );
}
