import SearchField from "./components/NewSearch";
import DashboardHeader from "./components/DashboardHeader";
import DashboardCards from "./components/DashboardCards";

const API_URL = "http://localhost:4000";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  // Grab all products for the dashboard cards and search functionality
  const dashboardResponse = await fetch(
    `${API_URL}/products/?_order=desc&_sort=id&_expand=category`,
  ).then((res) => res.json());

  const allProducts = dashboardResponse.products;

  // Fetch all categories for the search filter
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
        searchParams={params}
        allProducts={allProducts}
      />
    </main>
  );
}
