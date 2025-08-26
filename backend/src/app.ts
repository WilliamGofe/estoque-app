import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import stockRoutes from "./routes/stockRoutes";
import { authenticateToken } from "./middleware/authMiddlaware";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", authenticateToken, productRoutes);
app.use("/users", userRoutes);
app.use("/", authenticateToken, stockRoutes);
app.use("/auth", authRoutes);

export default app;