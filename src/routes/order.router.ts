import express from "express";
import * as orderController from "../controllers/order.controller";
import verifyToken from "../middleware/verifyToken.middleware";

const router = express.Router();

router.use(verifyToken)
router.get("/", orderController.getOrdersByUser);
router.post("/", orderController.createOrder);
router.put("/", orderController.updateOrder);

export default router;
