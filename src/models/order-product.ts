import { DataTypes, Model, Optional, Sequelize, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectDatabase";

export interface OrderProductAttributes {
  id?: string;
  orderId: string;
  productId: string;
  quantity: number
}

interface OrderProductCreationAttributes
  extends Optional<OrderProductAttributes, "id"> {}

interface OrderProductInstance
  extends Model<OrderProductAttributes, OrderProductCreationAttributes>,
    OrderProductAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const OrderProduct = sequelize.define<OrderProductInstance>(
  "OrderProduct",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    orderId: {
      type: DataTypes.STRING,
      references: {
        model: "Orders",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  },
  { tableName: "OrderProducts" }
);

export default OrderProduct;
