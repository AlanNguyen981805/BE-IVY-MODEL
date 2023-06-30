import { DataTypes, Model, Optional, Sequelize, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectDatabase";
import Size from "./size.model";

export interface SettingAttributes {
  id: string;
  page: object;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface SettingCreationAttributes extends Optional<SettingAttributes, "id"> {}

interface SettingInstance
  extends Model<SettingAttributes, SettingCreationAttributes>,
    SettingAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const Setting = sequelize.define<SettingInstance>(
  "Setting",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    page: {
      type: DataTypes.JSONB,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Settings",
  }
);

Setting.belongsToMany(Size, {
  through: "ProductSize",
  foreignKey: "SettingId",
  otherKey: "sizeId",
  as: "sizes",
});
Size.belongsToMany(Setting, {
  through: "ProductSize",
  foreignKey: "sizeId",
  otherKey: "SettingId",
  as: "Settings",
});
export default Setting;
