import { Request, Response } from "express";
import * as services from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const response = await services.getProductsService(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const response = await services.detailProductService(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const response = await services.createProductService(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
