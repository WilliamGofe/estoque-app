import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import pool from "../config/db";
// Função para formatar mensagens de validação
const formatValidationMessage = (error: Joi.ValidationError): string => {
  const key = error.details[0].context?.key;

  switch (key) {
    case "email":
      return "E-mail inválido ou já cadastrado";
    case "password":
      return "Senha inválida ou incompleta";
    case "name":
      return "Nome inválido ou já cadastrado";
    case "quantity":
      return "Quantidade inválida";
    case "min_quantity":
      return "Quantidade mínima inválida";
    case "sku":
      return "SKU inválido já cadastrado";
    case "product_id":
      return "Produto inválido";
    case "user_id":
      return "Usuário inválido";
    case "type":
      return "Tipo de movimentação inválido";
    case "date":
      return "Data inválida";
    default:
      return "Dados inválidos";
  }
};

// --- Valida parâmetro numérico na URL ---
export const validateIdParam = (paramName: string) => {
  const schema = Joi.number().integer().positive().required();

  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params[paramName]);
    if (error) {
      return res.status(400).json({ error: `Parâmetro inválido: ${paramName}` });
    }
    next();
  };
};

// --- Valida body para criação de produto ---
export const validateCreateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    quantity: Joi.number().integer().min(0).required(),
    min_quantity: Joi.number().integer().min(0).optional(),
    sku: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: formatValidationMessage(error) });

  // Verifica duplicidade de name ou sku
  const [rows] = await pool.query(
    "SELECT id FROM products WHERE name = ? OR sku = ?",
    [req.body.name, req.body.sku || ""]
  );
  if ((rows as any).length > 0) {
    return res.status(400).json({ error: "Produto ou SKU já existente" });
  }

  next();
};

// --- Valida body para atualização de produto ---
export const validateUpdateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    quantity: Joi.number().integer().min(0).optional(),
    min_quantity: Joi.number().integer().min(0).optional(),
    sku: Joi.string().optional()
  }).min(1); // precisa ter ao menos um campo

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: formatValidationMessage(error) });

  const productId = req.params.id;
  if (!productId) return res.status(400).json({ error: "ID do produto é obrigatório" });

  // Verifica se outro produto já possui o mesmo name ou sku
  const [rows] = await pool.query(
    "SELECT id FROM products WHERE (name = ? OR sku = ?) AND id != ?",
    [req.body.name || "", req.body.sku || "", productId]
  );

  if ((rows as any).length > 0) {
    return res.status(400).json({ error: "Nome ou SKU já existente em outro produto" });
  }

  next();
};
// --- Valida body para movimentação de estoque ---
export const validateStockMovement = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    product_id: Joi.number().integer().positive().required(),
    user_id: Joi.number().integer().positive().required(),
    type: Joi.string().valid("in", "out").required(),
    quantity: Joi.number().integer().positive().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: formatValidationMessage(error) });
  next();
};

// --- Valida filtros de listagem de estoque ---
export const validateStockQuery = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    product_id: Joi.number().integer().positive().optional(),
    user_id: Joi.number().integer().positive().optional(),
    date: Joi.date().iso().optional()
  });

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).json({ error: formatValidationMessage(error) });
  next();
};

export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: formatValidationMessage(error) });

  // Verifica duplicidade de email
  const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [req.body.email]);
  if ((rows as any).length > 0) {
    return res.status(400).json({ error: "E-mail já cadastrado" });
  }

  next();
};

// --- Valida login de usuário ---
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: formatValidationMessage(error) });
  next();
};
