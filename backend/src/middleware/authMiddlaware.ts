import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; 

    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido" });
  }
};
