'use client';
import React from 'react';

interface StockMovementCardProps {
  id: number;
  product_id: number;
  user_id: number;
  type: 'in' | 'out';
  quantity: number;
  created_at: string;
}

export default function StockMovementCard({ id, product_id, user_id, type, quantity, created_at }: StockMovementCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
      <p>Produto ID: {product_id}</p>
      <p>Usuário ID: {user_id}</p>
      <p>Tipo: {type}</p>
      <p>Quantidade: {quantity}</p>
      <p>Criado em: {new Date(created_at).toLocaleString()}</p>
    </div>
  );
}
