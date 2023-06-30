import express from "express";
import * as sliderController from "../controllers/slider.controller";

const router = express.Router();

router.get("/", sliderController.getSliders);
router.post("/", sliderController.createSlider);

export default router;
