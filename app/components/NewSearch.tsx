

import type { Category, Product } from "../types";
import ProductTable from "./ProductTable";
import Link from "next/link";

type SearchParams = {
    q?: string;
}

// categories should default to []
// pass categories only if the fetch returns a valid array, otherwise pass []
export default function SearchField({ 
  
  
  searchParams, products, categories = [],

} : {searchParams: SearchParams;
    products: Product[];
    categories?: Category[];

}
) {

  const submittedSearch = searchParams.q ?? "";
  const searchTerm = submittedSearch.trim().toLowerCase();
  

  const filteredProducts = 
    searchTerm === ""
      ? products
      : products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
    
        <form
        method="GET"
    
        className="flex w-full gap-1 rounded-lg border gray-200 bg-white p-2">

      <input
        type="text"
        name="q"
        defaultValue={submittedSearch}
       
        placeholder="Search products..."
        className="flex-2 px-2 border rounded"
        />

      <select className="border rounded">
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
        </select>
      <select className="border gray-200 rounded">
        <option value="">All stock</option>
        <option value="in-stock">In stock</option>
        <option value="low-stock">Low stock</option>
        <option value="out-of-stock">Out of stock</option>
      </select>
      <button
        type="submit"
        className="hover:bg-gray-300 px-2 border rounded">
    
     
        X Filter
      </button>
    </form>
    {/*Render the filtered products in the ProductTable component, this is double and means it should be taken away from page.tsx*/}
    <ProductTable products={filteredProducts} />
    </div>
  );
}