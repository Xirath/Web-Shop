"use client";

import FormField from "@/app/components/FormField";
import type { Product } from "@/app/types";
import { editProductAction, FormState } from "@/app/admin/actions";
import { useActionState } from "react";
import Link from "next/link";

const initialState: FormState = {};

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

  // Extracts the entered value or uses the product's existing value as a fallback
  const getDefaultValue = (name: string, fallback: string | number) =>
    (state.formData?.get(name) as string) ?? fallback;

  return (
    <form
      action={formAction}
      className="mt-16 mx-auto w-[25%] rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold">Edit Product</h2>

      <FormField
        name="title"
        label="Product title"
        type="text"
        placeholder="Enter product title"
        defaultValue={getDefaultValue("title", product.title)}
        required
      />
      {state.errors?.title && (
        <p className="text-red-500 text-sm">{state.errors.title}</p>
      )}

      <FormField
        name="brand"
        label="Brand"
        type="text"
        placeholder="Enter product brand"
        defaultValue={getDefaultValue(
          "brand",
          product.brand && product.brand.length >= 2 ? product.brand : "",
        )}
        required
      />
      {state.errors?.brand && (
        <p className="text-red-500 text-sm">{state.errors.brand}</p>
      )}

      {/* 
        If i understand correctly, a bug is making the select reset upon submission even if defaultValue is set correctly.
        Issue: https://github.com/react/react/issues/30580 
        TODO: Implement temporary workaround
      */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="categoryId"
          className="rounded-md border border-gray-300 px-3 py-2 text-gray-700"
          defaultValue={getDefaultValue("categoryId", 1)}
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
      {state.errors?.categoryId && (
        <p className="text-red-500 text-sm">{state.errors.categoryId}</p>
      )}

      <FormField
        name="price"
        label="Price"
        type="number"
        placeholder="Enter product price"
        min={0.5}
        step={0.01}
        defaultValue={getDefaultValue("price", product.price)}
        required
      />
      {state.errors?.price && (
        <p className="text-red-500 text-sm">{state.errors.price}</p>
      )}

      <FormField
        name="stock"
        label="Stock"
        type="number"
        placeholder="Enter Stock"
        defaultValue={getDefaultValue(
          "stock",
          (product.stock && product.stock > 0) || product.stock === 0
            ? product.stock
            : "",
        )}
        required
      />
      {state.errors?.stock && (
        <p className="text-red-500 text-sm">{state.errors.stock}</p>
      )}

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={getDefaultValue("description", product.description)}
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
        defaultValue={getDefaultValue("thumbnail", product.thumbnail)}
        required
      />
      {state.errors?.thumbnail && (
        <p className="text-red-500 text-sm">{state.errors.thumbnail}</p>
      )}

      <div className="flex justify-end gap-2">
        <Link
          href="/"
          className="w-35 rounded-md border border-blue-600 text-blue-600 px-4 py-2 hover:bg-blue-200 text-center"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="w-35 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-center"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
