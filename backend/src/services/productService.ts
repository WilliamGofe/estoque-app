import pool from "../config/db";

interface Product {
  name?: string;
  quantity?: number;
  sku?: string;
  min_quantity?: number;
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

const deleteProduct = async (id: number) => {
  const [result] = await pool.execute(
    "DELETE FROM products WHERE id = ?",
    [id]
  );
  return result;
}

 const updateProduct = async (id: number, data: Product) => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.quantity !== undefined) {
    fields.push("quantity = ?");
    values.push(data.quantity);
  }

  if (data.sku !== undefined) {
    fields.push("sku = ?");
    values.push(data.sku);
  }

  if (data.min_quantity !== undefined) {
    fields.push("min_quantity = ?");
    values.push(data.min_quantity);
  }

  if (fields.length === 0) {
    throw new Error("Nenhum dado para atualizar");
  }

  values.push(id);

  const [result] = await pool.execute(
    `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  return result;
};

export { getAll, create, updateProduct, deleteProduct };