import { DataTypes, Model, Optional, Sequelize, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../config/connectDatabase";

export interface SliderAttributes {
  id: string;
  image: string;
  link: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface SliderCreationAttributes extends Optional<SliderAttributes, "id"> {}

interface SliderInstance
  extends Model<SliderAttributes, SliderCreationAttributes>,
    SliderAttributes {
  createdAt?: string;
  updatedAt?: string;
}

const Slider = sequelize.define<SliderInstance>(
  "Slider",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Sliders",
  }
);

export default Slider;
