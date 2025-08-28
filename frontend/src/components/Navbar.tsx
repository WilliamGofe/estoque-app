'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav style={{ padding: '1rem', background: '#222', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link href="/" style={{ marginRight: '1rem', color: '#fff' }}>Home</Link>
        {token && <Link href="/products" style={{ marginRight: '1rem', color: '#fff' }}>Produtos</Link>}
        {token && <Link href="/stock" style={{ color: '#fff' }}>Estoque</Link>}
      </div>
      <div>
        {token ? (
          <button onClick={logout} style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button>
        ) : (
          <Link href="/login" style={{ color: '#fff' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}
