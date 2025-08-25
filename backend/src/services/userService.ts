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

const create = async (user: User): Promise<User> => {
  const { name, email, password } = user;
      console.log(user);

  const [result] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return { id: (result as any).insertId, ...user };
};

export { getAll, create };
