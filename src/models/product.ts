import { DataTypes, Model, Optional, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectDatabase";
import Color from "./color";
import ProductColor from "./productColor";

export interface ProductAttributes {
  id?: string;
  title: string;
  slug: string;
  price: string;
  cateId: string;
  oldPrice: string;
  stock: number;
  intro: string;
  description: string;
  preserve: string;
  isNew: boolean;
  isBestSeller: boolean;
  star: number;
  sku: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const Product = sequelize.define<ProductInstance>(
  "Product",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    cateId: {
      type: DataTypes.STRING,
      references: {
        model: "Categories",
        key: "id",
      },
    },
    slug: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    oldPrice: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    intro: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    preserve: {
      type: DataTypes.STRING,
    },
    star: {
      type: DataTypes.INTEGER,
    },
    sku: {
      type: DataTypes.STRING,
    },
    isNew: DataTypes.BOOLEAN,
    isBestSeller: DataTypes.BOOLEAN,
  },
  {
    tableName: "Products",
  }
);

Product.belongsToMany(Color, {
  through: ProductColor,
  foreignKey: "productId",
  otherKey: "colorId",
  as: "colors",
});

Color.belongsToMany(Product, {
  through: ProductColor,
  foreignKey: "colorId",
  as: "products",
});

export default Product;
