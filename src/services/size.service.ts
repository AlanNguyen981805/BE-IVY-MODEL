//@ts-ignore
import { Request } from "express";
import Size from "../models/size";

export const createSizeService = (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const { name, code, quantity } = req.body;
      if(!name || !code) {
        reject({
          error: 1,
          message: "Thiếu trường"
        })
      }
      const newSize = await Size.create({ code, name, quantity: 0 });
      if (newSize) {
        resolve({
          error: newSize ? 0 : 1,
          message: newSize ? "OK" : "Fail to create size",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
