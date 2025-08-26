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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const result = await productService.deleteProduct(id);

    if (result && 'affectedRows' in result && result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, quantity, sku, min_quantity } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    if (!name && quantity === undefined && !sku && min_quantity === undefined) {
      return res.status(400).json({ error: "Não há produtos para atualizar" });
    }

    const result = await productService.updateProduct(id, { name, quantity, sku, min_quantity });

    if (result && 'affectedRows' in result && result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.status(200).json({ message: "Produto atualizado com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { getProducts, createProduct, deleteProduct, updateProduct };
