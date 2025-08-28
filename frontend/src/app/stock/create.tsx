'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <Link href="/products/create" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block hover:bg-blue-600">
        Criar Produto
      </Link>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Qtd</th>
            <th className="border p-2">Mínimo</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.quantity}</td>
              <td className="border p-2">{p.min_quantity}</td>
              <td className="border p-2">{p.sku}</td>
              <td className="border p-2">
                <Link href={`/products/${p.id}`} className="text-blue-500 hover:underline">
                  Detalhes
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
