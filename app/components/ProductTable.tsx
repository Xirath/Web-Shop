import type { Product } from "../types";
import Image from "next/image";
import Link from "next/link";
import { DeleteButton } from "./admin/forms/form-delete";
import { Pencil } from "lucide-react";

function ProductRow({ product }: { product: Product }) {
  return (
    <tr>
      <td>
        <div className="flex justify-start items-center gap-4">
          <div className="h-12 w-12 shrink-0 sm:h-16 sm:w-16 lg:h-20 lg:w-20">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={100}
              height={100}
              sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 80px"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <p>{product.title}</p>
            <p className="sku">{`SKU: ${product.sku}`}</p>
          </div>
        </div>
      </td>
      <td>{product?.brand}</td>
      <td>{product?.category?.name}</td>
      <td>
        <span
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
              ? `In Stock `
              : `Low Stock `
            : `Out of Stock `}
        </span>
        ({product?.stock ?? 0})
      </td>
      <td className="font-bold">{`${Intl.NumberFormat("en-SV", { style: "currency", currency: "EUR" }).format(product.price)}`}</td>
      <td>
        <div className="flex gap-2 justify-start items-center">
          <DeleteButton id={product.id} />
          <Link
            href={`/admin/products/edit/${product.id}`}
            className="flex hover:text-green-600 duration-250"
          >
            <span className="sr-only">Edit</span>
            <Pencil />
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="mt-6 overflow-auto rounded-lg border border-gray-200 bg-white text-black">
      <table className="w-full border-collapse text-left [&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3">
        <thead className="bg-gray-50">
          <tr className="text-gray-500 p-10">
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
