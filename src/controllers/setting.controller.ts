import { Request, Response } from "express";
import * as services from "../services/setting.service";

export const createSetting = async (req: Request, res: Response) => {
  try {
    const response = await services.createSettingService(req);
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};
export const getSetting = async (req: Request, res: Response) => {
  try {
    const response = await services.getSettingService(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
