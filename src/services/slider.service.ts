//@ts-ignore
import { Request, Response } from "express";
import Slider, { SliderAttributes } from "../models/slider.model";

export const createSliderService = (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const { image, link, isActive } = <SliderAttributes>req.body;
      if (!image || !link) {
        reject({
          error: 0,
          message: "Không đủ trường",
        });
        return;
      }
      const newSlider = await Slider.create({
        image,
        link,
        isActive,
      });
      if (newSlider) {
        resolve({
          error: newSlider ? 0 : 1,
          message: newSlider ? "OK" : "Fail to create slider",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getSlidersService = (req: Request, res: Response) =>
  new Promise(async (resolve, reject) => {
    try {
      const sliders = await Slider.findAll({ where: { isActive: true } });
      if (sliders) {
        resolve({
          error: 0,
          mesage: "thành công",
          data: sliders,
        });
      } else {
        reject({
          error: 1,
          mesage: "thất bại",
          data: sliders,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
