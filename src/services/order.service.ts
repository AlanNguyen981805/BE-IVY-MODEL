import { Request, Response } from "express";
import Order, { OrderAttributes } from "../models/order.model";
import { sequelize } from "../config/connectDatabase";
import Product from "../models/product.model";
import ProductSize from "../models/productSize.model";
import OrderProduct from "../models/order-product";
import { IBodyOrder } from "../types/order.type";

export const getOrdersByUserService = (req: any, res: Response) =>
  new Promise(async (resolve, reject) => {
    try {
      const { id } = req.user;
      if (!id) {
        reject({
          error: 1,
          message: "Can't find user",
        });
      }

      const listOrdersByUser = await Order.findAndCountAll({
        where: { userId: id },
        attributes: { exclude: ["id", "userId", "productId"] },
        include: [
          {
            model: ProductSize,
            attributes: {
              exclude: ["sizeId", "productId", "colorId", "quantity"],
            },
            include: [
              {
                model: Product,
                as: "listSizes",
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "id",
                    "stock",
                    "intro",
                    "description",
                    "sku",
                    "isNew",
                    "isBestSeller",
                    "preserve",
                    "start"
                  ],
                },
              },
            ],
          },
        ],
      });

      resolve({
        error: 0,
        message: "get list order by user",
        data: listOrdersByUser,
      });
    } catch (error) {
      console.log("error :>> ", error);
      reject(error);
    }
  });

export const createOrderService = (req: Request, res: Response) =>
  new Promise(async (resolve, reject) => {
    const trans = await sequelize.transaction();

    const {
      orderInfo,
      paymentType,
      productId,
      transactionNo,
      transactionStatus,
      userId,
      quantity,
    } = <IBodyOrder>req.body;

    try {
      const foundProduct = await ProductSize.findOne({
        where: { sku: productId },
      });
      if (!foundProduct) {
        reject({
          error: 1,
          message: "không tìm thấy sản phẩm",
          data: null,
        });
        return;
      }
      if (foundProduct?.quantity !== null && foundProduct?.quantity <= 0) {
        reject({
          error: 1,
          message: "Chỉ còn 0 sản phẩm trong kho",
          data: null,
        });
        return;
      }

      const newOrder = await Order.findOrCreate({
        where: { transactionNo },
        defaults: {
          orderInfo,
          paymentType,
          productId,
          transactionNo,
          transactionStatus,
          userId,
        },
      });

      if (newOrder[0].id) {
        await OrderProduct.findOrCreate({
          where: { productId },
          defaults: {
            orderId: newOrder[0].id,
            productId: productId,
            quantity,
          },
        });
      }

      await trans.commit();
      resolve({
        error: 0,
        message: "Tạo đơn hàng thành công",
        data: newOrder,
      });
    } catch (error) {
      trans.rollback();
      reject({
        error: 1,
        data: null,
      });
    }
  });

export const updateOrderService = (req: Request, res: Response) =>
  new Promise(async (resolve, reject) => {
    const trans = await sequelize.transaction();

    const {
      orderInfo,
      paymentType,
      productId,
      transactionNo,
      transactionStatus,
      userId,
    } = <OrderAttributes>req.body;

    try {
      await Order.update(
        {
          orderInfo,
          paymentType,
          productId,
          transactionNo,
          transactionStatus,
          userId,
        },
        {
          where: { transactionNo },
        }
      );

      await trans.commit();
      resolve({
        error: 0,
        message: "Cập nhập đơn hàng thành công",
      });
    } catch (error) {
      reject({
        error: 1,
        data: null,
      });
      trans.rollback();
    }
  });
