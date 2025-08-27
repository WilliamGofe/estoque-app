import { Request, Response } from "express";
import * as authService from "../services/authService";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: (Number(process.env.JWT_EXPIRES_IN) || 3600) * 1000
    };

    res.cookie("token", data.token, cookieOptions);

    res.json({
      user: data.user,
      message: "Login realizado com sucesso"
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  
  return res.json({ message: "Logout bem sucedido" });
};

const register = async (req: Request, res: Response) => {
  try {
    const {name, email, password } = req.body;
    const data = await authService.register(name, email, password);

    res.status(201).json({
      name,
      email,
      message: "Usuário cadastrado com sucesso",
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export { login, register, logout };
