import express from "express";
import * as paymentController from "../controllers/payment.controller";

const router = express.Router();

router.post("/create-payment", paymentController.createPayment);
router.post("/result-payment", paymentController.resultPayment);
router.get("/ipn-vnpay", paymentController.ipnPayment);

export default router