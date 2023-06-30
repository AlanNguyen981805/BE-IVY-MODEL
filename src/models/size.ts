import { DataTypes, Model, Optional, Sequelize, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectDatabase";

export interface SizeAttributes {
  id?: string;
  name: string;
  code: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SizeCreationAttributes extends Optional<SizeAttributes, "id"> {}

interface SizeInstance
  extends Model<SizeAttributes, SizeCreationAttributes>,
    SizeAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const Size = sequelize.define<SizeInstance>("Size", {
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
  quantity: {
    type: DataTypes.INTEGER,
  },
}, {tableName: "Sizes"});

export default Size;
