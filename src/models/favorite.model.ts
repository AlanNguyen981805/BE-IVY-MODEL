import { DataTypes, Model, Sequelize, UUID } from "sequelize";
import { sequelize } from "../config/connectDatabase";
import Product from "./product.model";

export interface FavoriteAttributes {
  id?: string;
  userId: string;
  productId: string;
}

interface FavoriteInstance
  extends Model<FavoriteAttributes, FavoriteAttributes>,
    FavoriteAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const Favorite = sequelize.define<FavoriteInstance>(
  "Favorite",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "User",
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
  },
  {
    tableName: "Favorite",
  }
);

Favorite.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'id',
  as: "products"
})

export default Favorite;
