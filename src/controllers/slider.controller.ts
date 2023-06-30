import { Request, Response } from "express";
import * as services from "../services/slider.service";

export const createSlider = async (req: Request, res: Response) => {
  try {
    const response = await services.createSliderService(req);
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

export const getSliders = async (req: Request, res: Response) => {
  try {
    const response = await services.getSlidersService(req, res);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
