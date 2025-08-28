const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
};

export const getProductById = async (id: number) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao buscar produto');
  return res.json();
};

export const createProduct = async (product: {
  name: string;
  quantity: number;
  min_quantity?: number;
  sku?: string;
}) => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Erro ao criar produto');
  return res.json();
};

export const updateProduct = async (
  id: number,
  product: { name?: string; quantity?: number; min_quantity?: number; sku?: string }
) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Erro ao atualizar produto');
  return res.json();
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao deletar produto');
  return res.json();
};
