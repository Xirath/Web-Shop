"use server";
import { updateTag, revalidatePath } from "next/cache";
import type { ProductPost } from "../types";
import { redirect } from "next/navigation";


export async function createProductAction(formData:FormData){
    const title= formData.get("title") as string;
     const price= formData.get("price") as string;
      const brand= formData.get("brand") as string;
       const description= formData.get("description") as string;
        const stock= formData.get("stock") as string;
         const thumbnail= formData.get("thumbnail") as string;
          const categoryId= formData.get("categoryId") as string;


    console.log(formData);
    const now = new Date().toISOString();

    const newProduct : ProductPost = {
        title,
        brand,
        description,
        thumbnail,
        stock: parseInt(stock, 10),
        price: parseInt(price, 10),
        categoryId: parseInt(categoryId, 10),
        meta: {
            createdAt: now,
            updatedAt: now,
        },
        images: [],

        
    };
    const res = await fetch("http://localhost:4000/products", {method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newProduct),
    });

    if(!res.ok) throw new Error("unknown error")
    const json= res.json();
    revalidatePath("/")
    redirect("/")




    //updateTag("products-list");
}

async function deleteProduct(id: string) {
  const response = await fetch(`http://localhost:4000/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}

export async function deleteProductAction(formData:FormData) {
    const id = formData.get("id") as string;
    try{
        const success= await deleteProduct(id);
        revalidatePath("/");
    } catch(error){
        console.log(error);

    }
}