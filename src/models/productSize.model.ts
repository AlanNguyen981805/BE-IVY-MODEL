import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connectDatabase";

export interface ProductSizeAttributes {
  id: string;
  sizeId: string;
  productId: string;
  colorId: string;
  sku: string;
  quantity: number | null
}

interface ProductSizeInstance
  extends Model<ProductSizeAttributes, ProductSizeAttributes>,
    ProductSizeAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const ProductSize = sequelize.define<ProductSizeInstance>("ProductSize", {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  sizeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Size",
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
  sku: {
    type: DataTypes.STRING,
  },
  colorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Color",
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
    tableName: "ProductSize"
});


export default ProductSize;
