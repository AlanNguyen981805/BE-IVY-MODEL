import { Request, Response } from "express";
import * as services from "./../services/category.service";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const response = await services.getCategoriesService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: -1,
      message: "Failed at category controller" + error,
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const response = await services.createCategoryService(req)
    return res.status(200).json(response)
  } catch (error: any) {
    console.log('error :>> ', error);
    return res.status(500).json(error);
  }
};



