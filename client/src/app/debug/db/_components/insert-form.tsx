"use client";

export const InsertForm = ({
  onSubmit,
}: {
  onSubmit: (id: string) => void;
}) => {
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
