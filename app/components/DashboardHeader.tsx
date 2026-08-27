import Link from "next/link";
export default function DashboardHeader() {
  return (
    <header className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <p className="text-sm text-gray-500">
          Manage and track your global product catalogue across all categories
        </p>
      </div>

      <Link
        href="/admin/products/create"
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        <span>+</span>
        Add Product
      </Link>
    </header>
  );
}
