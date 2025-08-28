import db from "../config/db";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { RowDataPacket } from "mysql2";


interface UserData extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}


 const register = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );
  return result;
};

const login = async (email: string, password: string) => {

  const JWT_SECRET: Secret = process.env.JWT_SECRET || "secretKey"; 

  const [rows] = await db.execute<UserData[]>(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  const user = rows[0];
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

    const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600 }
    );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export { register, login };