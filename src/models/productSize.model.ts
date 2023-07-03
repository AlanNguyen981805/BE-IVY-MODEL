import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connectDatabase";
import Size from "./size.model";
import Product from "./product.model";

export interface ProductSizeAttributes {
  id: string;
  sizeId: string;
  productId: string;
  colorId: string;
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
