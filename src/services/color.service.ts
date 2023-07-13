import { Request } from "express";
import Color, { ColorAttributes } from "../models/color.model";

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

export const getColorService = (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const listColors = await Color.findAll({
        attributes: ["id", "name", "code"],
      });
      if (listColors) {
        resolve({
          error: listColors ? 0 : 1,
          message: listColors ? "OK" : "Fail to get colors",
          data: listColors,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
