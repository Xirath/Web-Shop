export function createQueryString(
  searchParams: Record<string, string | string[] | undefined>,
  updates: Record<string, string | number>,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
    }
  });

  Object.entries(updates).forEach(([key, value]) => {
    params.set(key, String(value));
  });

  return params.toString();
}