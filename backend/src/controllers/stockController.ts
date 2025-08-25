import type { Request, Response } from "express";
import * as stockService from "../services/stockService";

const getStockMovements = async (req: Request, res: Response) => {
  try {
    const movements = await stockService.getAll();
    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar movimentações de estoque" });
  }
};

const createStockMovement = async (req: Request, res: Response) => {
  try {
    const { product_id, user_id, type, quantity } = req.body;
    const movement = await stockService.create({ product_id, user_id, type, quantity });
    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar movimentação de estoque" });
  }
};

export { getStockMovements, createStockMovement };