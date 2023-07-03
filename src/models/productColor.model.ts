import { DataTypes, Model, Sequelize, UUID } from "sequelize";
import { sequelize } from "../config/connectDatabase";

export interface ProductColorAttributes {
  id?: string;
  colorId: string;
  productId: string;
  imgProduct: string
}

interface ProductColorInstance
  extends Model<ProductColorAttributes, ProductColorAttributes>,
    ProductColorAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const ProductColor = sequelize.define<ProductColorInstance>(
  "ProductColor",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    colorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Color",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Product",
        key: "id",
      },
    },
    imgProduct: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "ProductColor",
  }
);

export default ProductColor;
