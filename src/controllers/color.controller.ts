import { Request, Response } from "express";
import * as services from "../services/color.service";

export const createColor = async (req: Request, res: Response) => {
  try {
    const response = await services.createColorService(req)
    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

export const getColors = async (req: Request, res: Response) => {
  try {
    const response = await services.getColorService(req)
    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json(error);
  }
};


