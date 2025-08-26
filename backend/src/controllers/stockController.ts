import type { Request, Response } from "express";
import * as stockService from "../services/stockService";

const createStockMovement = async (req: Request, res: Response) => {
  try {
    const { product_id, user_id, type, quantity } = req.body;
    const movement = await stockService.create({ product_id, user_id, type, quantity });
    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar movimentação" });
  }
};

const getStockMovements = async (req: Request, res: Response) => {
  try {
    const { product_id, user_id, date } = req.query;

    const movements = await stockService.getAll({
      product_id: product_id ? Number(product_id) : undefined,
      user_id: user_id ? Number(user_id) : undefined,
      date: date ? String(date) : undefined,
    });
    
    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar movimentações" });
  }
};

export { createStockMovement, getStockMovements };
