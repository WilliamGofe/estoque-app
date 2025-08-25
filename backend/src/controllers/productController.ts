import type { Request, Response } from "express";
import * as productService from "../services/productService";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" }); 
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, quantity } = req.body;
    const product = await productService.create({ name, quantity });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

export { getProducts, createProduct };
