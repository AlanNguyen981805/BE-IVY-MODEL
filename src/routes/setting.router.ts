import express from "express";
import * as settingController from "../controllers/setting.controller";

const router = express.Router();

router.get("/", settingController.getSetting);
router.post("/", settingController.createSetting);

export default router