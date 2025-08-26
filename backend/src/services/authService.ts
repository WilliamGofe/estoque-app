import db from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

 const register = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );
  return result;
};

 const login = async ( email: string, password: string) => {
  const [rows]: any = await db.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  const user = rows[0];
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  console.log(user.password);
  console.log(password)
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(isPasswordValid)
  if (!isPasswordValid) {
    throw new Error("Senha inválida");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email }, 
    jwtConfig.secret, 
    { expiresIn: jwtConfig.expiresIn } 
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