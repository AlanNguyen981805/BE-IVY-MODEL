import { Request } from "express";
import { IAuth, IFormLogin } from "../types/auth.type";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPassword = (pass: string) =>
  bcrypt.hashSync(pass, bcrypt.genSaltSync(10));

export const registerService = (request: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        address,
        city,
        district,
        dob,
        email,
        firstName,
        gender,
        isArgeRule,
        isReciveNews,
        lastName,
        password,
        phone,
        ward,
      } = <IAuth>request.body;
      console.log("request.body :>> ", request.body);
      if (
        !address ||
        !city ||
        !district ||
        !dob ||
        !email ||
        !firstName ||
        !gender ||
        !lastName ||
        !password ||
        !phone ||
        !ward
      ) {
        reject({ error: "Missing required fields" });
        return;
      }
      const response = await User.findOrCreate({
        where: { phone },
        defaults: {
          phone,
          firstName,
          lastName,
          address,
          city,
          district,
          dob,
          email,
          gender,
          isArgeRule,
          isReciveNews,
          password: hashPassword(password),
          ward,
        },
      });
      resolve({
        error: response[1] ? 0 : 1,
        message: response[1]
          ? "Register successfully"
          : "User already register",
        data: response[0],
      });
    } catch (error) {
      reject(error);
    }
  });

export const loginService = (request: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const { password, phone } = <IFormLogin>request.body;
      if (!password || !phone) {
        reject({
          error: 1,
          message: "Missing inputs",
        });
        return;
      }

      const response = await User.findOne({
        where: {
          phone,
        },
        raw: true,
      });
      if (!response) {
        reject({
          error: 1,
          message: "Không tìm thấy tài khoản ",
          data: null,
        });
        return;
      } else {
        const isCorrectPassword =
          response && bcrypt.compareSync(password, response.password);
        const token =
          isCorrectPassword &&
          jwt.sign({ id: response.id, phone: response.phone }, "secret_key", {
            expiresIn: "2d",
          });

        response.password = "";
        if (!token) {
          reject({
            error: 1,
            message: "password is wrong",
            data: null,
          });
          return;
        }

        resolve({
          error: 0,
          message: "Đăng nhập thành công",
          data: {
            user: response,
            token: token,
          },
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      reject(error);
    }
  });
