import { Package2, CircleCheck, TriangleAlert, CircleX } from "lucide-react";
import DashboardCard from "./DashboardCard";
import type { Product } from "../types";

interface StockCounts {
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

function getStockCounts(products: Product[]): StockCounts {
  let inStock = 0;
  let lowStock = 0;
  let outOfStock = 0;

  products.forEach((product) => {
    const stock = product.stock ?? 0;

    if (stock === 0) {
      outOfStock++;
    } else if (stock < 10) {
      lowStock++;
    } else {
      inStock++;
    }
  });
  return { inStock, lowStock, outOfStock };
}

export default function DashBoardCards({ products }: { products: Product[] }) {
  const stockCounts = getStockCounts(products);

  return (
    <div className="grid grid-cols-4 gap-2">
      <DashboardCard
        title="PRODUCTS"
        count={products.length}
        color="blue"
        icon={Package2}
      />

      <DashboardCard
        title="IN STOCK"
        count={stockCounts.inStock}
        color="green"
        icon={CircleCheck}
      />

      <DashboardCard
        title="LOW STOCK"
        count={stockCounts.lowStock}
        color="orange"
        icon={TriangleAlert}
      />

      <DashboardCard
        title="OUT OF STOCK"
        count={stockCounts.outOfStock}
        color="red"
        icon={CircleX}
      />
    </div>
  );
}
