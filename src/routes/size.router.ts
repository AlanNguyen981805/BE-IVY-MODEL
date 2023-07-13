import express from "express";
import * as sizeController from "../controllers/size.controller.ts";

const router = express.Router();

router.post("/", sizeController.createSize);
router.get('/',sizeController.getSizes )

export default router