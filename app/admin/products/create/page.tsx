import AddProductForm from "@/app/components/AddProductForm";

const API_URL = "http://localhost:4000";

export default async function CreateProductPage() {
  const categoriesResponse = await fetch(`${API_URL}/categories/`);

  if (!categoriesResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await categoriesResponse.json();

  return (
    <main className="p-6">
      <AddProductForm categories={categories} />
    </main>
  );
}