import pool from "../config/db";

interface Product {
  name: string;
  quantity: number;
}

 const getAll = async () => {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
};

 const create = async (product: Product) => {
  const { name, quantity } = product;
  const [result] = await pool.query(
    "INSERT INTO products (name, quantity) VALUES (?, ?)",
    [name, quantity]
  );
  return { id: (result as any).insertId, ...product };
};

export { getAll, create };