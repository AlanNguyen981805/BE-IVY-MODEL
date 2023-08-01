import { GENDER } from "./base";

export interface IAuth {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: GENDER;
  city: string;
  district: string;
  ward: string;
  address: string;
  password: string;
  isArgeRule: boolean;
  isReciveNews: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFormLogin {
    email: string;
    phone: string;
    password: string;
}

export interface IRequest extends Request {
    user: IAuth
  }