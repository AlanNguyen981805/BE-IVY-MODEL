import express from "express";
import * as productController from "../controllers/product.controller";
import verifyToken from "../middleware/verifyToken.middleware";

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/category/:category", productController.getProducts);
router.get("/:slug", productController.getProduct);
router.post("/", productController.createProduct);

router.use(verifyToken)
router.get("/favorite/lists", productController.getPostFavorites);
router.get("/favorite/:idProduct", productController.createFavorite);
router.delete("/favorite/:idProduct", productController.deleteFavorite);


export default router;
