"use server";

import { updateTag } from "next/cache";

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

    const newProduct = {
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
    const res = fetch("http://localhost:4000/products", {method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newProduct),
    });

    

    //updateTag("products-list");
}