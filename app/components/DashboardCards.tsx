export default function DashboardCards() {
  return (
    <section className="grid grid-cols-4 gap-2 ">
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm font-medium text-gray-500" >
            PRODUCTS
            </p>

        <p className="text-3xl font-boldtext-violet-500" >
            193</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4" >
        <p className=" text-sm font-medium text-gray-500" >
            IN STOCK</p> 
        <p className="text-3xl font-boldtext-green-500" >
            169</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4" >
        <p className=" text-sm font-medium text-gray-500" >
            LOW STOCK</p>
        <p className="text-3xl font-boldtext-orange-500" >
            20</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4" >
        <p className=" text-sm font-medium text-gray-500" >
            OUT OF STOCK</p>
        <p className="text-3xl font-boldtext-red-500" >
            4
        </p>
      </div>
    </section>
  );
}
