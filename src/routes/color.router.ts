import express from "express";
import * as colorController from "../controllers/color.controller";

const router = express.Router();

router.post("/", colorController.createColor);
router.get("/", colorController.getColors);

export default router