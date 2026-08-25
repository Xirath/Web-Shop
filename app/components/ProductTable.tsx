import type { Product } from "../types";
import { DeleteButton } from "./form-delete";

function ProductRow({ product }: { product: Product }) {
  return (
    <tr>
      <td>
        <div>
          <p>{product.title}</p>
          <p className="sku">{`SKU: ${product.sku}`}</p>
        </div>
      </td>
      <td>{product?.brand}</td>
      <td>{product?.category?.name}</td>
      <td
        className={`${
          product?.stock === 0
            ? "out-of-stock"
            : product?.stock != null && product.stock < 10
              ? "low-stock"
              : "in-stock"
        }`}
      >
        {product?.stock != null && product.stock > 0
          ? product.stock >= 10
            ? `In Stock(${product.stock})`
            : `Low Stock(${product.stock})`
          : `Out of Stock(0)`}
      </td>
      <td>{product.price}</td>
      <td>
        {/*<button className="rounded bg-red-700 px-4 py-2 text-white hover:bg-red-800">
          Delete
        </button>*/}
        <DeleteButton id={product.id}/>
        <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
          Edit
        </button>
      </td>
    </tr>
  );
}

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="mt-6 overflow-auto rounded-lg border border-gray-200 bg-white text-black">
      <table className="w-full border-collapse text-left">
        <thead className="bg-gray-50">
          <tr>
            <th>Title</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
