//@ts-ignore
import { Request } from "express";
import { buildTree } from "../helpers/tranform";
import Category, { CategoryAttributes } from "../models/category";
import { IResponse } from "../types/base";

export const createCategoryService = (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, parent_id, slug, link, isSale } = req.body;
      if (!name || !slug || !link) {
        reject({
          error: 0,
          message: "Không đủ trường",
        });
        return;
      }
      const newCategory = await Category.create({
        name,
        parent_id,
        slug,
        link,
        isSale,
      });
      if (newCategory) {
        resolve({
          error: newCategory ? 0 : 1,
          message: newCategory ? "OK" : "Fail to create category",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
export const getCategoriesService = () =>
  new Promise<IResponse<CategoryAttributes[]>>(async (resolve, reject) => {
    try {
      const response = await Category.findAll();
      const tree = buildTree(response);
      resolve({
        error: 0,
        message: "OK",
        data: tree,
      });
    } catch (error) {
      console.log("error :>> ", error);
      reject(error);
    }
  });


