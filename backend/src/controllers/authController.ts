import { Request, Response } from "express";
import * as authService from "../services/authService";

 const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
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


export { login, register };
