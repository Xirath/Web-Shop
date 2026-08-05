export default function Search() {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="border"
      />
      <select className="border">
        <option value="">All Categories</option>
        <option value="women-watches">Women's watches</option>
        <option value="women-shoes">Women's shoes</option>
        <option value="men-shirts">Men's shirts</option>
        

      </select>
      <select className="border">
        <option value="">All stock</option>
        <option value="in-stock">In stock</option>
        <option value="low-stock">Low stock</option>
        <option value="out-of-stock">Out of stock</option>
      </select>
      <button> X Filter</button>
    </div>
  );
}