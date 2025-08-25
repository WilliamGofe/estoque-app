import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import stockRoutes from "./routes/stockRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/stock", stockRoutes);

app.listen(4000, () => {
  console.log("Servidor rodando em http://localhost:4000");
});
