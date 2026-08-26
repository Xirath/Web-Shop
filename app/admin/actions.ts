"use server";

import { revalidatePath } from "next/cache";

async function deleteProduct(id: number) {
  const response = await fetch(`http://localhost:4000/products/${id}`, {
    method: "DELETE",
  });}

export async function deleteProductAction(id: number) {
  try{
    await deleteProduct(id);
    revalidatePath("/");
    return {message:"success"}
  } catch(error){
    return {message:"could not delete product"}
  }
}
