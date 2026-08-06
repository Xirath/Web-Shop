// import { useState } from "react";
// import { Filter } from "lucide-react";
import type { Category } from "../types";
import type { CategoriesResponse } from "../types";





export default function SearchField({ categories }: { categories: Category[] }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedStock, setSelectedStock] = useState("");

  return (
    <div className="flex w-full gap-1 rounded-lg border gray-200 bg-white p-2">
      <input
        type="text"
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
      <button className="hover:bg-gray-300 px-2 border gray-200 rounded">X Filter</button>
    </div>
  );
}

