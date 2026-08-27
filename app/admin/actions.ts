"use server";

import { api } from "@/lib/api";
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


async function deleteProduct(id: number) {
  const response = await fetch(`http://localhost:4000/products/${id}`, {
    method: "DELETE",
  });}

export async function deleteProductAction(id: number) {
  try{
    await deleteProduct(id);
    revalidatePath("/");
    return true
  } catch(error){
    return false
  }
}

export type FormState = {
  errors?: {
    title?: string;
    price?: string;
  };
};

export async function editProductAction(
  id: number,
  _prevState: FormState,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const brand = formData.get("brand") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as string;
  const stock = formData.get("stock") as string;
  const description = formData.get("description") as string;
  const thumbnail = formData.get("thumbnail") as string;

  const errors: FormState["errors"] = {};

  if (!title || title.length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

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

  return {};
}
