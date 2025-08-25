import pool from "../config/db";

interface User {
  name: string;
  email: string;
}

const getAll = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

const create = async (user: User) => {
  const { name, email } = user;
  const [result] = await pool.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );
  return { id: (result as any).insertId, ...user };
};

export { getAll, create };