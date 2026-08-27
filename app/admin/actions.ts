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
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create product");
  }
  redirect("/");
}

export async function deleteProductAction(id: number) {
  // TODO: Implement the delete logic here
}

export type FormState = {
  error?: string;
  formData?: FormData;
  errors?: {
    title?: string;
    brand?: string;
    price?: string;
    stock?: string;
    thumbnail?: string;
    categoryId?: string;
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

  const parsedPrice = parseFloat(price);
  const parsedStock = parseFloat(stock);

  console.log("Selected categoryId:", parseInt(categoryId, 10));

  if (!title || title.length < 3) {
    errors.title = "Title must be at least 3 characters long";
  }
  if (!brand || brand.length < 2) {
    console.log("Brand error:", brand);
    errors.brand = "Brand must be at least 2 characters long";
  }
  if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
    errors.price = "Price must be a positive number";
  }
  if (!stock || isNaN(parsedStock) || parsedStock < 0) {
    errors.stock = "Stock must be zero or more";
  } else if (parsedStock % 1 !== 0) {
    errors.stock = "Stock must be a whole number";
  }
  // TODO: should probably be a more robust URL validation, but this is a simple check for now
  try {
    const url = new URL(thumbnail);
    if (url.hostname !== "cdn.dummyjson.com") {
      errors.thumbnail = "Only images from cdn.dummyjson.com are allowed";
    }
  } catch {
    errors.thumbnail = "Thumbnail must be a valid URL";
  }

  // TODO: should probably check if the categoryId exists in the database, but for now just check if it's a number
  if (!categoryId || isNaN(parseInt(categoryId, 10))) {
    errors.categoryId = "Category must be selected";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      error: "Please fix the errors below and try again",
      formData,
    };
  }

  const newProduct = {
    title,
    brand,
    description,
    thumbnail,
    categoryId: parseInt(categoryId, 10),
    price: parsedPrice,
    stock: parsedStock,
    meta: {
      updatedAt: new Date().toISOString(),
    },
  };

  try {
    await api.editProduct(id.toString(), newProduct);
    revalidatePath("/");
  } catch {
    return {
      error: "Failed to update product",
      formData,
    };
  }

  // TODO: show a success message and redirect to the product list page after successful update
  redirect("/?status=success");
}
