"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteProductAction(id: number) {
  // TODO: Implement the delete logic here
}

export async function editProductAction(id: number, formData: FormData) {
  console.log("???");
  const title = formData.get("title") as string;
  const brand = formData.get("brand") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as string;
  const stock = formData.get("stock") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;

  console.log("Getting Form Data:", {
    title,
    brand,
  });

  const newProduct = {
    title,
    brand,
    description,
    thumbnail,
    categoryId: parseInt(categoryId, 10),
    price: parseInt(price, 10),
    stock: parseInt(stock, 10),
    meta: {
      updatedAt: new Date().toISOString(),
    },
  };

  try {
    await api.editProduct(id.toString(), newProduct);
    revalidatePath("/");
  } catch {
    console.error("Failed to update product");
  }

  // TODO: show a success message and redirect to the product list page after successful update
  //redirect("/admin/?status=success");
}
