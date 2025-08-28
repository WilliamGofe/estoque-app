// services/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(`${API_URL}${url}`, {
    credentials: "include", // para enviar cookies JWT
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Erro na requisição");
  }

  return res.json();
};

// Auth
export const loginUser = (email: string, password: string) =>
  fetcher("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const registerUser = (name: string, email: string, password: string) =>
  fetcher("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

export const logoutUser = () =>
  fetcher("/auth/logout", { method: "POST" });

// Products
export const getProducts = () => fetcher("/products");
export const createProduct = (data: { name: string; quantity: number; sku?: string; min_quantity?: number }) =>
  fetcher("/products", { method: "POST", body: JSON.stringify(data) });

export const updateProduct = (id: number, data: any) =>
  fetcher(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteProduct = (id: number) =>
  fetcher(`/products/${id}`, { method: "DELETE" });

// Stock
export const getStockMovements = () => fetcher("/stock-movements");
export const createStockMovement = (data: { product_id: number; type: "in" | "out"; quantity: number }) =>
  fetcher("/stock-movements", { method: "POST", body: JSON.stringify(data) });
