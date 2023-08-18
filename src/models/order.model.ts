import { DataTypes, Model, Optional, Sequelize, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectDatabase";
import Product from "./product.model";
import OrderProduct from "./order-product";
import ProductSize from "./productSize.model";

export interface OrderAttributes {
  id?: string;
  userId: string;
  productId: string;
  transactionStatus: 1 | 2 | 3;
  orderInfo: string;
  paymentType: string;
  transactionNo: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

interface OrderInstance
  extends Model<OrderAttributes, OrderCreationAttributes>,
    OrderAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const Order = sequelize.define<OrderInstance>(
  "Order",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.STRING,
    },
    transactionStatus: {
      type: DataTypes.INTEGER,
    },
    orderInfo: {
      type: DataTypes.INTEGER,
    },
    paymentType: {
      type: DataTypes.INTEGER,
    },
    transactionNo: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "Orders" }
);


Order.belongsToMany(ProductSize, {
  through: OrderProduct,
  foreignKey: 'orderId',
  otherKey: 'productId'
});

ProductSize.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'productId',
  otherKey: 'orderId'
});
export default Order;
