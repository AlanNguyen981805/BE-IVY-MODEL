import express from "express";
import * as categoryController from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", categoryController.register);
router.post("/login", categoryController.login);

export default router