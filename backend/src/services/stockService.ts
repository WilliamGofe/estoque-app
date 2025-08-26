import pool from "../config/db";

interface StockMovement {
  id?: number;
  product_id: number;
  user_id: number;
  type: "in" | "out";
  quantity: number;
  created_at?: Date;
}

interface StockFilters {
  product_id?: number;
  user_id?: number;
  start_date?: string;
  end_date?: string;
  date?: string;
}

const getAll = async (filter?: StockFilters): Promise<StockMovement[]> => {
  let query = "SELECT * FROM stock_movements WHERE 1=1";
  const values: any[] = [];

  if (filter?.product_id) {
    query += " AND product_id = ?";
    values.push(filter.product_id);
  }
  if (filter?.user_id) {
    query += " AND user_id = ?";
    values.push(filter.user_id);
  }
  if (filter?.date) {
    query += " AND DATE(created_at) = ?";
    values.push(filter.date);
  }

  const [rows] = await pool.query(query, values);
  return rows as StockMovement[];
};

const create = async (movement: StockMovement) => {
  const { product_id, user_id, type, quantity } = movement;

  // Busca o produto
  const [products] = await pool.query("SELECT * FROM products WHERE id = ?", [product_id]);
  const product = (products as any)[0];
  if (!product) throw new Error("Produto não encontrado");

  // Valida quantidade
  if (quantity <= 0) throw new Error("Quantidade deve ser maior que 0");
  if (type === "out" && product.quantity < quantity) throw new Error("Estoque insuficiente");

  // Calcula nova quantidade
  const newQuantity = type === "in" ? product.quantity + quantity : product.quantity - quantity;

  // Atualiza estoque do produto
  await pool.query("UPDATE products SET quantity = ?, updated_at = NOW() WHERE id = ?", [
    newQuantity,
    product_id,
  ]);

  // Insere o movimento
  const [result] = await pool.query(
    "INSERT INTO stock_movements (product_id, user_id, type, quantity) VALUES (?, ?, ?, ?)",
    [product_id, user_id, type, quantity]
  );

  // Verifica alerta de estoque baixo
  const minQty = product.min_quantity || 0;
  const alert = newQuantity < minQty
    ? `⚠️ Estoque baixo para o produto ${product.name}. Quantidade atual: ${newQuantity}, mínimo: ${minQty}`
    : null;

  // Retorna dados do movimento
  return {
    id: (result as any).insertId,
    product_id,
    user_id,
    type,
    quantity,
    newQuantity,
    alert,
    created_at: new Date()
  };
};




export { getAll, create };
