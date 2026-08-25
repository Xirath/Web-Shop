"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function DeleteButtonIcon() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-label="Delete product"
      className="hover:text-red-600 duration-250 flex"
    >
      {pending ? (
        <LoaderCircle className="animate-spin" aria-hidden="true" />
      ) : (
        <Trash2 aria-hidden="true" />
      )}
    </button>
  );
}

export function DeleteButton({ id }: { id: number }) {
  const handleDelete = async () => {
    // TODO: Implement the delete logic here
    console.log("Delete not implemented yet");
  };
  return (
    <form action={handleDelete}>
      <DeleteButtonIcon />
    </form>
  );
}
