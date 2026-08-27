"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteProductAction } from "@/app/admin/actions";
import toast from "react-hot-toast";

function DeleteButtonIcon() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-label="Delete product"
      className="hover:text-red-600 cursor-pointer duration-[250ms] flex"
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
    if(!confirm("Are you sure you want to delete this product?")) return;
    const result = await deleteProductAction(id);

        if(!result){
            toast.error("Could not delete product")
            return
        }
        toast.success("Product deleted");
  };
  return (
    <form action={handleDelete}>
      <DeleteButtonIcon />
    </form>
  );
}
