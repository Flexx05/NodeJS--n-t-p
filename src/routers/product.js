import {
  createProduct,
  getAllProducts,
  getProductById,
  removeProduct,
  updateProduct,
} from "../controllers/product";
import { Router } from "express";

const router = Router();
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.delete("/products/:id", removeProduct);
router.put("/products/:id", updateProduct);
router.post("/products", createProduct);

export default router;
