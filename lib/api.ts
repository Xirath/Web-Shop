import { Product, Category } from "@/app/types";

const BASE_URL = "http://localhost:4000";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const formattedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  const url = `${BASE_URL}${formattedEndpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `Unknown error: ${response.status} (${response.statusText})`,
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Nätverksfel eller API-fel på ${endpoint}:`, error);
    throw error;
  }
}

// Generic functions for making API requests
function get<T>(endpoint: string, options?: RequestInit) {
  return apiRequest<T>(endpoint, { ...options, method: "GET" });
}

function post<T>(endpoint: string, body: any, options?: RequestInit) {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  });
}

function del<T>(endpoint: string, options?: RequestInit) {
  return apiRequest<T>(endpoint, { ...options, method: "DELETE" });
}

function put<T>(endpoint: string, body: any, options?: RequestInit) {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// Exporting the API functions for use in other parts of the application
export const api = {
  getProduct: (id: string | number, options: { expand?: string } = {}) => {
    const query = options.expand ? `?_expand=${options.expand}` : "";

    return get<Product>(`/products/${id}${query}`);
  },

  editProduct: <Product>(id: string, product: Product) =>
    apiRequest<Product>(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    }),

  deleteProduct: (id: string | number) =>
    apiRequest<void>(`/products/${id}`, {
      method: "DELETE",
    }),

  createProduct: <Product>(product: Product) =>
    apiRequest<Product>(`/products`, {
      method: "POST",
      body: JSON.stringify(product),
    }),

  getCategories: () => get<Category[]>(`/categories`),
};
