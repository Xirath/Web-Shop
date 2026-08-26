import FormField from "./FormField"
import type { Category } from "../types";

export default function AddProductForm({ categories }: { categories: Category[] }) {
  return (
    <form className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        
      <h2 className="mb-6 text-2xl font-bold">
  Add Product
</h2>

      <FormField
        label="Product title"
        type="text"
        placeholder="Enter product title"
        required
      />

      <FormField
  label="Brand"
  type="text"
  placeholder="Enter product brand"
  required
/>

<div className="mb-4">
  <label className="mb-1 block text-sm font-medium text-gray-700">
    Category</label>

  <select className="rounded-md border border-gray-300 px-3 py-2 text-gray-700" required>
    
    <option value="">Choose a category</option>
    {categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>
</div>


 <FormField
  label="Price"
  type="number"
  placeholder="Enter product price"
  required
/>

 <FormField
  label="Stock"
  type="number"
  placeholder="Enter Stock"
  required
/>
<div className="mb-4">
  <label className="mb-1 block text-sm font-medium text-gray-700">
    Description</label>
  <textarea placeholder="Enter product description" className="min-h-28 w-full rounded-md border border-gray-300 px-3 py-2"
required />
</div>

<FormField
  label="Thumbnail"
  name="thumbnail"
  type="url"
  placeholder="Enter image URL"
  required
/>


<button
  type="submit"
  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  
>
  Add Product </button>
   </form> ); }