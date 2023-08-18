import { Request, Response } from "express";
import * as services from "../services/order.service";

export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    const response = await services.getOrdersByUserService(req, res);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const response = await services.createOrderService(req, res);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const response = await services.updateOrderService(req, res);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
