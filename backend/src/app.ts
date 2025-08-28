import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import stockRoutes from "./routes/stockRoutes";
import { authenticateToken } from "./middleware/authMiddlaware";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Substitua pelo domínio do seu frontend
  credentials: true // Permite o uso de cookies, headers de autorização, etc.
}));
app.use("/products", authenticateToken, productRoutes);
app.use("/users", userRoutes);
app.use("/", authenticateToken, stockRoutes);
app.use("/auth", authRoutes);
app.use(cookieParser()); 

export default app;