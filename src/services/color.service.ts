import { Request } from "express";
import Color, { ColorAttributes } from "../models/color";

export const createColorService = (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, code, isActive = true } = <ColorAttributes>req.body;
      if (!name || !code) {
        reject({
          error: 1,
          message: "Thiếu trường",
        });
      }
      const newColor = await Color.create({ code, name, isActive });
      console.log({ newColor });
      if (newColor) {
        resolve({
          error: newColor ? 0 : 1,
          message: newColor ? "OK" : "Fail to create color",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
