import { ProductAttributes } from "../models/product.model";

export interface IBodyProduct extends ProductAttributes {
  attributes: IAttribute[];
}

export interface IAttribute {
  idColor: string;
  size: {
    id: string;
    quantity: number;
  }[];
  listImg: string;
}
