import pool from "../config/db";

interface StockMovement {
  id?: number;
  product_id: number;
  user_id: number;
  type: "in" | "out";
  quantity: number;
  created_at?: Date;
}

const getAll = async (): Promise<StockMovement[]> => {
  const [rows] = await pool.query("SELECT * FROM stock_movements");
  return rows as StockMovement[];
};

const create = async (movement: StockMovement): Promise<StockMovement> => {
  const { product_id, user_id, type, quantity } = movement;
  const [result] = await pool.query(
    "INSERT INTO stock_movements (product_id, user_id, type, quantity) VALUES (?, ?, ?, ?)",
    [product_id, user_id, type, quantity]
  );
  return { id: (result as any).insertId, ...movement };
};

export { getAll, create };
