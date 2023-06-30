import express from "express";
import * as sizeController from "../controllers/size.controller.ts";

const router = express.Router();

router.post("/", sizeController.createSize);

export default router