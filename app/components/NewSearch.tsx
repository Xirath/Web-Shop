import type { Category, Product } from "../types";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";
import { Funnel } from "lucide-react";

const PAGE_LIMIT = 8;

type RawSearchParams = Record<string, string | string[] | undefined>;

function getParam(searchParams: RawSearchParams, key: string) {
  const value = searchParams[key];
  return typeof value === "string" ? value : "";
}

// categories should default to []
// pass categories only if the fetch returns a valid array, otherwise pass []
export default function SearchField({
  searchParams,
  categories = [],
  allProducts,
}: {
  searchParams: RawSearchParams;
  categories?: Category[];
  allProducts: Product[];
}) {
  const submittedSearch = getParam(searchParams, "q");
  const selectedCategory = getParam(searchParams, "category");
  const selectedStock = getParam(searchParams, "stock");
  const currentPage = Number(getParam(searchParams, "page") || "1");
  const searchTerm = submittedSearch.trim().toLowerCase();

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      searchTerm === "" || product.title.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "" ||
      product.category?.name.toLowerCase() === selectedCategory;

    const stock = product.stock ?? 0;
    const matchesStock =
      selectedStock === "" ||
      (selectedStock === "in-stock" && stock >= 10) ||
      (selectedStock === "low-stock" && stock > 0 && stock < 10) ||
      (selectedStock === "out-of-stock" && product.stock === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_LIMIT),
  );
  const pageProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_LIMIT,
    currentPage * PAGE_LIMIT,
  );

  return (
    <div>
      <form
        method="GET"
        className="flex w-full gap-1 rounded-lg border bg-white p-2"
      >
        <input
          type="text"
          name="q"
          defaultValue={submittedSearch}
          placeholder="Search products..."
          className="flex-2 px-2 border rounded"
        />

        <select
          className="border rounded"
          name="category"
          defaultValue={selectedCategory}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name.toLowerCase()}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          className="border gray-200 rounded"
          name="stock"
          defaultValue={selectedStock}
        >
          <option value="">All stock</option>
          <option value="in-stock">In stock</option>
          <option value="low-stock">Low stock</option>
          <option value="out-of-stock">Out of stock</option>
        </select>
        <button type="submit" className="hover:bg-gray-300 px-2 border rounded">
          <span className="flex items-center gap-1">
            <Funnel
              className="pb-[1px] h-[1em] w-[1em] shrink-0"
              fill="black"
            />
            Filter
          </span>
        </button>
      </form>
      {/*Render the filtered products in the ProductTable component, this is double and means it should be taken away from page.tsx*/}
      {!pageProducts.length ? (
        <p>No products found.</p>
      ) : (
        <ProductTable
          changedProduct={getParam(searchParams, "changed")}
          products={pageProducts}
        />
      )}
      <Pagination
        currentPage={currentPage}
        pages={totalPages}
        searchParams={searchParams}
      />
    </div>
  );
}
