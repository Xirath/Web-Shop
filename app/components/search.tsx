// import { useState } from "react";
// import { Filter } from "lucide-react";

function SearchField() {
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
        <option value="women-watches">Women's watches</option>
        <option value="women-shoes">Women's shoes</option>
        <option value="men-shirts">Men's shirts</option>
        

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

export default SearchField;