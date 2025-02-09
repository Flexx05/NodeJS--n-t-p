import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  removeProduct,
  updateProduct,
} from "../controllers/product";

const router = Router();
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.post("/products", createProduct);
router.delete("/products/:id", removeProduct);

export default router;
