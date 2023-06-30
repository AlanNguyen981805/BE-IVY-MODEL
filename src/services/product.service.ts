import { Request } from "express";
import Color from "../models/color";
import Product from "../models/product";
import Size from "../models/size";
import { IAttribute, IBodyProduct } from "../types/product.type";
import ProductColor, { ProductColorAttributes } from "../models/productColor";
import ProductSize, { ProductSizeAttributes } from "../models/productSize";
import { v4 as uuidV4 } from "uuid";
import { sequelize } from "../config/connectDatabase";

export const getProductsService = (req: Request) =>
  new Promise(async (resolve, reject) => {
    try {
      const { category } = req.params;
      const { page, pageSize } = req.query;

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

      const whereCondition: { cateId?: string } = {};
      if (category) {
        whereCondition.cateId = category;
      }
      const products = await Product.findAll({
        where: whereCondition,
        include: [
          {
            model: Color,
            as: "colors",
            attributes: ["id", "name", "code", "isActive"],
            through: { attributes: ["imgProduct"], as: "image" },
            include: [
              {
                model: Size,
                attributes: ["id", "name", "code"],
                as: "sizes",
                through: { attributes: ["quantity"], as: "stock" },
              },
            ],
          },
        ],
        limit: validPageSize,
        offset: (validPage - 1) * validPageSize,
      });
      const totalCount = await Product.count({
        where: whereCondition,
      });

      resolve({
        data: {
          products,
          total: totalCount,
        },
      } as any);
    } catch (error) {
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
            include: [
              {
                model: Size,
                attributes: ["id", "name", "code"],
                as: "sizes",
                through: { attributes: ["quantity"], as: "stock" },
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
      });
    });
  });

  return {
    productColor,
    productSize,
  };
};