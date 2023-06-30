import { Request, Response } from "express";
import * as services from "../services/size.service";

export const createSize = async (req: Request, res: Response) => {
  try {
    const response = await services.createSizeService(req)
    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(500).json(error);
  }
};


