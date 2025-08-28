'use client';
import React from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  quantity: number;
  min_quantity: number;
  sku?: string;
  onDelete?: (id: number) => void;
}

export default function ProductCard({ id, name, quantity, min_quantity, sku, onDelete }: ProductCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
      <h3>{name} {sku && `(${sku})`}</h3>
      <p>Quantidade: {quantity}</p>
      <p>Quantidade mínima: {min_quantity}</p>
      {onDelete && <button onClick={() => onDelete(id)} style={{ marginTop: '0.5rem' }}>Deletar</button>}
    </div>
  );
}
