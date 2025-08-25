import * as express from "express";
import * as cors from "cors";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import stockRoutes from "./routes/stockRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/stock", stockRoutes);

export default app;