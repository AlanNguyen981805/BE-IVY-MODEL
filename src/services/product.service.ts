import { Request } from "express";
import Color from "../models/color.model";
import Product from "../models/product.model";
import Size from "../models/size.model";
import { IAttribute, IBodyProduct } from "../types/product.type";
import ProductColor, {
  ProductColorAttributes,
} from "../models/productColor.model";
import ProductSize, {
  ProductSizeAttributes,
} from "../models/productSize.model";
import { v4 as uuidV4 } from "uuid";
import { sequelize } from "../config/connectDatabase";
import { Op, Sequelize } from "sequelize";
import { generateSKU } from "../helpers/tranform";
import Favorite from "../models/favorite.model";

export const getProductsService = (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const { category } = req.params;
      const {
        page,
        pageSize,
        productName,
        listColors,
        listSizes,
        sortPrice,
        maxPrice,
        sortByCreated,
        minPrice,
      }: {
        page?: string;
        pageSize?: string;
        productName?: string;
        listColors?: string;
        listSizes?: string;
        sortPrice?: string;
        sortByCreated?: string;
        minPrice?: string;
        maxPrice?: string;
      } = req.query;

      let validPageSize = parseInt((pageSize as string) || "10");
      let validPage = parseInt((page as string) || "1");

      // Kiểm tra xem pageSize và page có hợp lệ
      if (
        isNaN(validPageSize) ||
        isNaN(validPage) ||
        validPageSize <= 0 ||
        validPage <= 0
      ) {
        // Trả về thông báo lỗi nếu pageSize hoặc page không hợp lệ
        reject({
          error: "PageSize and page must be valid positive integers.",
        });
        return;
      }

      const whereCondition: any = {};
      if (category) {
        whereCondition.cateId = category;
      }
      if (productName) {
        whereCondition.title = {
          [Op.like]: `%${productName}%`,
        };
      }
      if (minPrice && maxPrice) {
        whereCondition.price = {
          [Op.between]: [String(minPrice), String(maxPrice)],
        };
      }

      const products = await Product.findAndCountAll({
        distinct: true,
        where: whereCondition,
        attributes: {
          exclude: [
            "stock",
            "intro",
            "description",
            "preserve",
            "star",
            "sku"
          ],
        },
        include: [
          {
            model: Color,
            as: "colors",
            attributes: ["id", "name", "code", "isActive"],
            through: { attributes: ["imgProduct"], as: "image" },
            where:
              listColors && listColors?.length > 0
                ? {
                    id: {
                      [Op.in]: listColors.split(","),
                    },
                  }
                : {},
          },
          {
            model: ProductSize,
            attributes: ["sku", "quantity", "colorId"],
            as: "listSizes",
            include: [
              {
                model: Size,
                attributes: ["id", "name"],
                as: "size",
              },
            ],
            where:
              listSizes && listSizes?.length > 0
                ? {
                    sizeId: {
                      [Op.in]: listSizes.split(","),
                    },
                  }
                : {},
          },
        ],
        order: [
          ["price", sortPrice?.toUpperCase() === "ASC" ? "ASC" : "DESC"],
          [
            "createdAt",
            sortByCreated?.toUpperCase() === "ASC" ? "ASC" : "DESC",
          ],
        ],
        limit: validPageSize,
        offset: (validPage - 1) * validPageSize,
      });
      resolve({
        data: {
          products,
        },
      } as any);
    } catch (error) {
      console.log("error :>> ", error);
      reject(error);
    }
  });

export const createProductService = async (req: Request) => {
  const transaction = await sequelize.transaction();
  try {
    const dataValid = checkValidBodyProduct(req.body);
    if (!dataValid) {
      return {
        code: 1,
        message: "Không đủ trường",
      };
    }
    const { attributes } = <IBodyProduct>req.body;

    const resProduct = await Product.create(req.body, { transaction });
    if (resProduct.dataValues.id) {
      const idProduct = resProduct.dataValues.id;
      const { productColor, productSize } = convertAttribute(
        attributes,
        idProduct
      );
      console.log(productSize);
      await ProductColor.bulkCreate(productColor, { transaction });
      await ProductSize.bulkCreate(productSize, { transaction });
    }

    await transaction.commit();

    return {
      code: 1,
      message: "Success",
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const detailProductService = async (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({
        where: {
          slug,
        },
        include: [
          {
            model: Color,
            as: "colors",
            attributes: ["id", "name", "code", "isActive"],
            through: { attributes: ["imgProduct"], as: "image" },
          },
          {
            model: ProductSize,
            attributes: ["sku", "quantity", "colorId"],
            as: "listSizes",
            include: [
              {
                model: Size,
                attributes: ["id", "name"],
                as: "size",
              },
            ],
          },
        ],
      });
      if (product) {
        resolve({
          error: 0,
          message: "Thành công",
          data: product,
        });
      } else {
        reject({
          error: 1,
          message: "Không tìm thấy sản phẩm",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

const checkValidBodyProduct = (body: IBodyProduct) => {
  const {
    cateId,
    attributes,
    description,
    intro,
    isBestSeller,
    isNew,
    oldPrice,
    preserve,
    price,
    sku,
    slug,
    star,
    stock,
    title,
  } = body;
  if (!cateId || !description || !price || !sku || !title) {
    return false;
  }
  return true;
};

const convertAttribute = (attribute: IAttribute[], productId: string) => {
  const productColor: ProductColorAttributes[] = attribute.map((item) => ({
    id: uuidV4(),
    colorId: item.idColor,
    productId,
    imgProduct: item.listImg,
  }));

  const productSize: ProductSizeAttributes[] = [];

  attribute.forEach((item) => {
    item.size.forEach((size) => {
      productSize.push({
        id: uuidV4(),
        colorId: item.idColor,
        productId,
        sizeId: size.id,
        quantity: size.quantity,
        sku: generateSKU(),
      });
    });
  });

  return {
    productColor,
    productSize,
  };
};

export const createFavoriteProduct = (req: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const { idProduct } = req.params;
      const { id } = req.user;
      if (!id && !idProduct) {
        resolve({
          error: 1,
          message: "Missing inputs",
        });
      }
      const response = await Favorite.create({
        id: uuidV4(),
        productId: idProduct,
        userId: id,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to create favorite",
        response,
      });
    } catch (error) {
      console.log("error :>> ", error);
      reject(error);
    }
  });

export const deleteFavoriteService = (req: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const { idProduct } = req.params;
      const { id } = req.user;
      if (!id && !idProduct) {
        resolve({
          error: 1,
          message: "Missing inputs",
        });
      }

      const response = await Favorite.destroy({ where: { id: idProduct } });
      resolve({
        error: response ? 0 : 1,
        message: response ? "OK" : "Failed to delete favorite",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getFavoritesService = (req: any) =>
  new Promise(async (resolve, reject) => {
    try {
      const { id } = req.user;
      if (!id) {
        reject({
          error: 1,
          message: "Can't find user",
        });
      }
      const response = await Favorite.findAndCountAll({
        distinct: true,
        where: { userId: id },
        attributes: ["id"],
        nest: true,
        include: [
          {
            model: Product,
            as: "products",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "intro",
                "description",
                "preserve",
                "star",
                "sku",
                "cateId",
              ],
            },
            include: [
              {
                model: Color,
                as: "colors",
                attributes: ["id", "name", "code", "isActive"],
                through: { attributes: ["imgProduct"], as: "image" },
              },
              {
                model: ProductSize,
                attributes: ["sku", "quantity", "colorId"],
                as: "listSizes",
                include: [
                  {
                    model: Size,
                    attributes: ["id", "name"],
                    as: "size",
                  },
                ],
              },
            ],
          },
        ],
      });

      resolve({
        error: response ? 0 : 1,
        data: response,
      });
    } catch (error) {
      console.log("error :>> ", error);
      reject(error);
    }
  });
