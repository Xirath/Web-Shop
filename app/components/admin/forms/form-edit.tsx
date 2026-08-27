"use client";

import FormField from "@/app/components/FormField";
import type { Product } from "@/app/types";
import { editProductAction, FormState } from "@/app/admin/actions";
import { useActionState } from "react";

const initialState: FormState = {};

// TODO: Proper formatting of the currency
export default function EditProductForm({
  product,
  categories,
}: {
  product: Product;
  categories: { id: string | number; name: string }[];
}) {
  const updateWithId = editProductAction.bind(null, product.id);
  const [state, formAction, isPending] = useActionState(
    updateWithId,
    initialState,
  );
  return (
    <form
      action={formAction}
      className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold">Edit Product</h2>

      <FormField
        name="title"
        label="Product title"
        type="text"
        placeholder="Enter product title"
        defaultValue={product.title}
        required
      />
      {state.errors?.title && <p>{state.errors.title}</p>}
      <FormField
        name="brand"
        label="Brand"
        type="text"
        placeholder="Enter product brand"
        defaultValue={product.brand}
        required
      />

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="categoryId"
          className="rounded-md border border-gray-300 px-3 py-2 text-gray-700"
          defaultValue={String(product.categoryId)}
          required
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <FormField
        name="price"
        label="Price"
        type="number"
        placeholder="Enter product price"
        defaultValue={product.price}
        required
      />

      <FormField
        name="stock"
        label="Stock"
        type="number"
        placeholder="Enter Stock"
        defaultValue={product.stock}
        required
      />
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={product.description}
          placeholder="Enter product description"
          className="min-h-28 w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <FormField
        name="thumbnail"
        label="Thumbnail URL"
        type="text"
        placeholder="Enter thumbnail URL"
        defaultValue={product.thumbnail}
        required
      />

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Edit Product
      </button>
    </form>
  );
}
