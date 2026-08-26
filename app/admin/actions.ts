"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProductAction(formData: FormData) {
  // Creates a new product from the submitted form data
  const title = formData.get("title") as string;
  const brand = formData.get("brand") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as string;
  const stock = formData.get("stock") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;


const newProduct = {
  title,
  brand,
  categoryId: parseInt(categoryId, 10),
   price: parseFloat(price),
  stock: parseInt(stock, 10),
  description,
  thumbnail,
  images: [],
};

try {
  const res = await fetch("http://localhost:4000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  if (!res.ok) {
  throw new Error("Failed to create product");

}
    revalidatePath("/");
  }
 catch (error) {
  console.error(error);
  throw new Error("Failed to create product");
}
redirect("/");
}

export async function deleteProductAction(id: number) {
  // TODO: Implement the delete logic here
}
