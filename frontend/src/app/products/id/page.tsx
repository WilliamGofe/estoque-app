'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById, updateProduct, deleteProduct } from '../../../services/productService';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar produto');
      }
    }
    loadProduct();
  }, [id]);

  const handleUpdate = async () => {
    if (!product) return;
    setError('');
    setSuccess('');
    try {
      await updateProduct(Number(id), product);
      setSuccess('Produto atualizado com sucesso!');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar produto');
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    try {
      await deleteProduct(Number(id));
      router.push('/products');
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar produto');
    }
  };

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Produto</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        type="text"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="number"
        value={product.quantity}
        onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="number"
        value={product.min_quantity}
        onChange={(e) => setProduct({ ...product, min_quantity: Number(e.target.value) })}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        value={product.sku}
        onChange={(e) => setProduct({ ...product, sku: e.target.value })}
        className="border p-2 rounded mb-4 w-full"
      />

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Atualizar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}
