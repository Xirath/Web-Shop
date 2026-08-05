import { useState } from "react";

function SearchField() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStock, setSelectedStock] = useState("");

  return (
    <div className="flex gap-1">
      <input
        type="text"
        placeholder="Search products..."
        className="border"
      />
      <select className="border">
        <option value="">All Categories</option>
        <option value="women-watches">Women's watches</option>
        <option value="women-shoes">Women's shoes</option>
        <option value="men-shirts">Men's shirts</option>
        

      </select>
      <select className="border">
        <option value="">All stock</option>
        <option value="in-stock">In stock</option>
        <option value="low-stock">Low stock</option>
        <option value="out-of-stock">Out of stock</option>
      </select>
      <button> X Filter</button>
    </div>
  );
}

export default SearchField;