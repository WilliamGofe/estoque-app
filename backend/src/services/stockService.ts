import pool from "../config/db";

interface StockMovement {
  product_id: number;
  user_id: number;
  type: "in" | "out";
  quantity: number;
}

export const getAll = async () => {
  const [rows] = await pool.query("SELECT * FROM stock_movements");
  return rows;
};

export const create = async (movement: StockMovement) => {
  const { product_id, user_id, type, quantity } = movement;
  const [result] = await pool.query(
    "INSERT INTO stock_movements (product_id, user_id, type, quantity) VALUES (?, ?, ?, ?)",
    [product_id, user_id, type, quantity]
  );
  return { id: (result as any).insertId, ...movement };
};
