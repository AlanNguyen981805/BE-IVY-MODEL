import { DataTypes, Model, Optional, Sequelize, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectDatabase";
import { v4 as uuidv4 } from "uuid";
import Product from "./product";

export interface CategoryAttributes {
  id: string;
  name: string;
  parent_id: number | null;
  slug: string;
  link: string;
  isSale: boolean;
  children?: CategoryAttributes[];
  leafNode?: CategoryAttributes[];
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const Category = sequelize.define<CategoryInstance>("Category", {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    unique: true,
  },
  name: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  parent_id: {
    allowNull: true,
    type: DataTypes.UUID,
  },
  slug: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  link: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  isSale: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
});

Category.hasMany(Product, {
  foreignKey: "cateId",
  as: "products",
});

export default Category;
