import { Request, Response } from "express";
import * as services from "../services/payment.service";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const response = await services.createPaymentService(req, res);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const resultPayment = async (req: Request, res: Response) => {
  try {
    const response = await services.resultPaymentService(req, res);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const ipnPayment = async (req: Request, res: Response) => {
  try {
    const response = await services.ipnPaymentService(req, res);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};





