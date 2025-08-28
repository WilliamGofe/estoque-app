'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetcher } from '../../utils/api';
import StockMovementCard from '../../components/StockMovementCard';

interface StockMovement {
  id: number;
  product_id: number;
  user_id: number;
  type: 'in' | 'out';
  quantity: number;
  created_at: string;
}

export default function StockPage() {
  const { token } = useAuth();
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [error, setError] = useState('');

  const loadMovements = async () => {
    try {
      const data = await fetcher('/stock-movements', token);
      setMovements(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) loadMovements();
  }, [token]);

  if (!token) return <p>Você precisa estar logado para acessar essa página.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Movimentações de Estoque</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movements.map(m => (
        <StockMovementCard key={m.id} {...m} />
      ))}
    </div>
  );
}
