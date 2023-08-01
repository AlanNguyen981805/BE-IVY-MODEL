import { Request, Response } from "express";
import * as services from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const response = await services.registerService(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const response = await services.loginService(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};




