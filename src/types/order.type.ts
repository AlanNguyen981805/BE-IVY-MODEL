import { OrderAttributes } from "../models/order.model";

interface IOrder {
    userId: string
}

export interface IBodyOrder extends OrderAttributes {
    quantity: number
}