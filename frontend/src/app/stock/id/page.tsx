'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getStockMovementById } from '../../../services/stockService';

export default function StockMovementDetailPage() {
  const { id } = useParams();
  const [movement, setMovement] = useState<any>(null);

  useEffect(() => {
    async function fetchMovement() {
      const data = await getStockMovementById(Number(id));
      setMovement(data);
    }
    fetchMovement();
  }, [id]);

  if (!movement) return <p>Carregando...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Movimento</h1>
      <ul className="list-disc pl-6">
        <li>ID: {movement.id}</li>
        <li>Produto: {movement.product_id}</li>
        <li>Usuário: {movement.user_id}</li>
        <li>Tipo: {movement.type}</li>
        <li>Quantidade: {movement.quantity}</li>
        <li>Data: {new Date(movement.created_at).toLocaleString()}</li>
      </ul>
    </div>
  );
}
