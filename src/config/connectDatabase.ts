import { Dialect, Sequelize } from "sequelize";

console.log(process.env.DB_PASSWORD);
export const sequelize = new Sequelize("ivy-model-clone", "postgres", "180598", {
  host: "127.0.0.1",
  dialect: "postgres",
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect DB successfully");
  } catch (error) {
    console.log("Connect db fail", error);
  }
};

export default connectDb;