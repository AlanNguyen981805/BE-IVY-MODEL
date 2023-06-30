import { Express } from "express";
import { DOMAIN } from "../helpers/const";
import categoryRouter from "./category.router";
import productRouter from "./product.router";
import sizeRouter from "./size.router";
import colorRouter from "./color.router";

const initRouter = (app: Express) => {
  app.use(DOMAIN.CATEGORIES, categoryRouter);
  app.use(DOMAIN.PRODUCT, productRouter);
  app.use(DOMAIN.SIZE, sizeRouter);
  app.use(DOMAIN.COLOR, colorRouter);
};

export default initRouter;
