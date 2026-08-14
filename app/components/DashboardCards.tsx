import { Package2, CircleCheck, TriangleAlert, CircleX } from "lucide-react";
import DashboardCard from "./DashboardCard";

export default function DashBoardCards() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <DashboardCard
        title="PRODUCTS"
        count={193}
        color="blue"
        icon={Package2}
      />

      <DashboardCard
        title="IN STOCK"
        count={169}
        color="green"
        icon={CircleCheck}
      />

      <DashboardCard
        title="LOW STOCK"
        count={20}
        color="orange"
        icon={TriangleAlert}
      />

      <DashboardCard
        title="OUT OF STOCK"
        count={4}
        color="red"
        icon={CircleX}
      />
    </div>
  );
}
