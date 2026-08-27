import EditProductForm from "@/app/components/admin/forms/form-edit";
import { Product } from "@/app/types";
import { api } from "@/lib/api";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: Add some error handling here if the product is not found or if the API call fails
  const product = await api.getProduct(id, { expand: "category" });
  const categories = await api.getCategories();

  return <EditProductForm product={product} categories={categories} />;
}
