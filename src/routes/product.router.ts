import express from "express";
import * as productController from "../controllers/product.controller";

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/category/:category", productController.getProducts);
router.get("/:slug", productController.getProduct);
router.post("/", productController.createProduct);

export default router;
