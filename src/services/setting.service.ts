import { Request } from "express";
import Setting, { SettingAttributes } from "../models/setting.model";

export const createSettingService = (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const { page, isActive } = <SettingAttributes>req.body;
      if (!page) {
        reject({
          error: 0,
          message: "Không đủ trường",
        });
        return;
      }
      const newSetting = await Setting.create({
        page,
        isActive,
      });
      if (newSetting) {
        resolve({
          error: newSetting ? 0 : 1,
          message: newSetting ? "OK" : "Fail to create slider",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getSettingService = (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await Setting.findAll();
      if (response) {
        resolve({
          error: 0,
          message: "Thành công",
          data: response,
        });
      } else {
        reject({ error: 1, message: "có lỗi xảy ra" });
      }
    } catch (error) {
      reject(error);
    }
  });
