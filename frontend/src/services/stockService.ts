const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const getStockMovements = async () => {
  const res = await fetch(`${API_URL}/stock-movements`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao buscar movimentos de estoque');
  return res.json();
};

export const createStockMovement = async (movement: {
  product_id: number;
  user_id: number;
  type: 'in' | 'out';
  quantity: number;
}) => {
  const res = await fetch(`${API_URL}/stock-movements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(movement),
  });
  if (!res.ok) throw new Error('Erro ao criar movimento de estoque');
  return res.json();
};

export const getStockMovementById = async (id: number) => {
  const res = await fetch(`${API_URL}/stock-movements/${id}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao buscar movimento de estoque');
  return res.json();
};
