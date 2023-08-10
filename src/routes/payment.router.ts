import express from "express";
import * as paymentController from "../controllers/payment.controller";

const router = express.Router();

router.post("/create-payment", paymentController.createPayment);

export default router