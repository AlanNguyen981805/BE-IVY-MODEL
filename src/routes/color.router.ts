import express from "express";
import * as colorController from "../controllers/color.controller";

const router = express.Router();
console.log('object :>> ');
router.post("/", colorController.createColor);
router.get("/", colorController.getColors);

export default router