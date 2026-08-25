export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetch(`http://localhost:4000/products/${id}`).then(
    (res) => res.json(),
  );
  return (
    <div>
      <h1>Edit Product</h1>
      <p>This is the temporary edit product page.</p>
      <p>Editing: {product.title}</p>
    </div>
  );
}
