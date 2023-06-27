import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/connectDatabase";

export interface CategoryAttributes {
  id: string;
  name: string;
  parent_id: number | null;
  slug: string;
  link: string;
  isSale: boolean;
  children?: CategoryAttributes[];
  leafNode?: CategoryAttributes[];
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Category = sequelize.define<CategoryInstance>("Category", {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  name: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  parent_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
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

export default Category;
