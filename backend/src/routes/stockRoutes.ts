import { Router } from "express";
import { getStockMovements, createStockMovement } from "../controllers/stockController";
import { validateStockMovement, validateStockQuery } from "../middleware/validation";

const router = Router();

router.get("/stock-movements", validateStockQuery, getStockMovements);
router.post("/stock-movements", validateStockMovement, createStockMovement);

export default router;
