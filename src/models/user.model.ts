import { DataTypes, Model, Optional, Sequelize, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectDatabase";
import { IAuth } from "../types/auth.type";

interface CategoryCreationAttributes extends Optional<IAuth, "id"> {}

interface UserInstance extends Model<IAuth, CategoryCreationAttributes>, IAuth {
  createdAt?: string;
  updatedAt?: string;
}

const User = sequelize.define<UserInstance>("User", {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  ward: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  isArgeRule: {
    type: DataTypes.STRING,
  },
  isReciveNews: {
    type: DataTypes.STRING,
  },
});

export default User;
