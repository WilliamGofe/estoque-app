import { Router } from "express";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/productController";
import { validateCreateProduct, validateIdParam, validateUpdateProduct } from "../middleware/validation";

const router = Router();
router.get("/products", getProducts);
router.post("/products", validateCreateProduct, createProduct);
router.put("/products/:id", validateIdParam("id"), validateUpdateProduct, updateProduct);
router.delete("/products/:id", validateIdParam("id"), deleteProduct);
export default router;
