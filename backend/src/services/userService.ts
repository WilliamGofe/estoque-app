import pool from "../config/db";

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

const getAll = async (): Promise<User[]> => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows as User[];
};

export { getAll };
