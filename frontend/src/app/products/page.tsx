'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetcher, API_URL } from '../../utils/api';
import ProductCard from '../../components/ProductCard';

interface Product {
  id: number;
  name: string;
  quantity: number;
  min_quantity: number;
  sku?: string;
}

export default function ProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    try {
      const data = await fetcher('/products', token);
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetcher(`/products/${id}`, token, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) loadProducts();
  }, [token]);

  if (!token) return <p>Você precisa estar logado para acessar essa página.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Produtos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {products.map(p => (
        <ProductCard key={p.id} {...p} onDelete={handleDelete} />
      ))}
    </div>
  );
}
