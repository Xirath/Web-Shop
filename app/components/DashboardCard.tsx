import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  color: string;
  backgroundColor?: string;
}

export default function DashboardCard({
  title,
  count,
  icon: Icon,
  color,
  backgroundColor,
}: DashboardCardProps) {
  return (
    <div
      className="rounded-lg border p-4 mb-5 w-full"
      style={{
        backgroundColor: backgroundColor || "oklch(96.7% 0.003 264.542)",
      }}
    >
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p
        className="text-3xl font-bold w-full flex items-center justify-between"
        style={{ color }}
      >
        {count}
        <Icon
          className="h-[1em] w-[1em] shrink-0"
          fill={color}
          color={backgroundColor || "oklch(96.7% 0.003 264.542)"}
        />
      </p>
    </div>
  );
}
