import type { ProductsResponse } from "./types";
import SearchField from "./components/search";
import ProductTable from "./components/ProductTable";
import DashboardHeader from "./components/DashboardHeader";
import DashboardCards from "./components/DashboardCards";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";

export default async function Home() {
  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info
  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/`,
  ).then((res) => res.json());

  return (
    <main>
      <h1>Products</h1>
    
      <DashboardHeader  />
      <DashboardCards />
       <SearchField />
        
      <ProductTable products={products} />
      
      
      
    </main>
  );
}
