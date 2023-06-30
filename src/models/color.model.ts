import { DataTypes, Model, Optional, Sequelize, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectDatabase";
import Size from "./size.model";

export interface ColorAttributes {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ColorCreationAttributes extends Optional<ColorAttributes, "id"> {}

interface ColorInstance
  extends Model<ColorAttributes, ColorCreationAttributes>,
    ColorAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const Color = sequelize.define<ColorInstance>(
  "Color",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Colors",
  }
);

Color.belongsToMany(Size, {
  through: "ProductSize",
  foreignKey: "colorId",
  otherKey: "sizeId",
  as: "sizes",
});
Size.belongsToMany(Color, {
  through: "ProductSize",
  foreignKey: "sizeId",
  otherKey: "colorId",
  as: "colors",
});
export default Color;
