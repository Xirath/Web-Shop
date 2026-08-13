interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardCard({title,count,icon,color}: DashboardCardProps) {

  return (
    <div  className="rounded-lg border bg-gray-100 p-4">

      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold" style={{ color }}>
        {count}
      </p>
      <p>{icon}</p>
    </div>
    
  );
}