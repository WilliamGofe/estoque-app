import type { Request, Response } from "express";
import * as userService from "../services/userService";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export { getUsers };
