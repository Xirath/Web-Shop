"use client"; // needed for usestate
import { useState } from "react";
// import { Filter } from "lucide-react";
import type { Category, Product } from "../types";
import ProductTable from "./ProductTable";


// categories should default to []
// pass categories only if the fetch returns a valid array, otherwise pass []
export default function SearchField({ 
  categories = [],
  products = [],

}: { categories?: Category[], products?: Product[] }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  
  

  //even when the search term is empty, we want to show all products, so we filter only when the search term is not empty

  const filteredProducts = 
    submittedSearch.trim() === ""
      ? products
      : products.filter((product) =>
    product.title.toLowerCase().includes(submittedSearch.trim().toLowerCase())
  );

  return (
    <div>
    <div className="flex w-full gap-1 rounded-lg border gray-200 bg-white p-2">
      <input
        type="text"
        value={searchTerm}
        onChange= {(event) => setSearchTerm(event.target.value)}
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
      <button className="hover:bg-gray-300 px-2 border gray-200 rounded" 
      type="button" 
      onClick={() => setSubmittedSearch(searchTerm)}>
        X Filter
      </button>
    </div>
    {/*Render the filtered products in the ProductTable component*/}
    <ProductTable products={filteredProducts} />
    </div>
  );
}