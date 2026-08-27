import type { ProductsResponse, SearchParams } from "./types";
import SearchField from "./components/NewSearch";
import ProductTable from "./components/ProductTable";
import DashboardHeader from "./components/DashboardHeader";
import DashboardCards from "./components/DashboardCards";
import AddProductForm from "./components/AddProductForm";
import Pagination from "./components/Pagination";


const API_URL = "http://localhost:4000";
const defaultLimit = 8;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page ?? "1");
  const currentLimit = defaultLimit;
  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info


const { products, total, page, pages, limit }: ProductsResponse = await fetch(
  `${API_URL}/products/?_page=${currentPage}&_limit=${currentLimit}&_sort=id&_order=desc&_expand=category`,
).then((res) => res.json());
  

  const dashboardResponse = await fetch(`${API_URL}/products/?_limit=200`).then(
    (res) => res.json(),
  );
 
  const allProducts = dashboardResponse.products;

  const categoriesResponse = await fetch(`${API_URL}/categories/`);

  if (!categoriesResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await categoriesResponse.json();

  return (
    <main>
      <DashboardHeader />

      <DashboardCards products={allProducts} />

      <SearchField
        categories={categories}
        products={products}
        searchParams={params}
      />

      

      <Pagination
        currentPage={currentPage}
        pages={pages}
        searchParams={params}
      />

      <AddProductForm categories={categories} />
    </main>
  );
}
