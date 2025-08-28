"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "../services/service";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      router.push("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link href="/">Controle Estoque</Link>
      </h1>
      <nav>
        <Link className="mr-4" href="/products">Produtos</Link>
        <Link className="mr-4" href="/stock">Estoque</Link>
        <button disabled={loading} onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">
          Logout
        </button>
      </nav>
    </header>
  );
}
