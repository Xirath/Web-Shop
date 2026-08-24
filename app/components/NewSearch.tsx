

import type { Category, Product, SearchParams } from "../types";
import ProductTable from "./ProductTable";




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
  const selectedCategory = searchParams.category ?? "";
  const selectedStock = searchParams.stock ?? "";
  const searchTerm = submittedSearch.trim().toLowerCase();
  

  const filteredProducts = products.filter((product) => {


    const matchesSearch =
     searchTerm === "" ||
     product.title.toLowerCase().includes(searchTerm);

    const matchesCategory =
    selectedCategory === "" ||
    product.category?.name.toLowerCase() === selectedCategory;

    const stock = product.stock ?? 0;
    const matchesStock =
    selectedStock === "" ||
    (selectedStock === "in-stock" && stock >= 10) ||
    (selectedStock === "low-stock" &&
      stock > 0 &&
      stock < 10) ||
    (selectedStock === "out-of-stock" && product.stock === 0);



    return matchesSearch && matchesCategory && matchesStock;





  });

  return (
    <div>
    
        <form
        method="GET"
    
        className="flex w-full gap-1 rounded-lg border bg-white p-2">

      <input
        type="text"
        name="q"
        defaultValue={submittedSearch}
       
        placeholder="Search products..."
        className="flex-2 px-2 border rounded"
        />

      <select className="border rounded"
      name="category"
      defaultValue={selectedCategory}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name.toLowerCase()}>
            {category.name}
          </option>
        ))}
        </select>
      <select className="border gray-200 rounded"
      name="stock"
      defaultValue={selectedStock}>
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
    {!filteredProducts.length ? (
        <p>No products found.</p>
        ) : (
        <ProductTable products={filteredProducts} />
        )}  
    
    </div>
  );
}