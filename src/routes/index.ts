import { Express } from "express";
import { DOMAIN } from "../helpers/const";
import categoryRouter from "./category.router";
import productRouter from "./product.router";
import sizeRouter from "./size.router";
import colorRouter from "./color.router";
import sliderRouter from "./slider.router";
import settingRouter from "./setting.router";
import authRouter from "./auth.router";

const initRouter = (app: Express) => {
  app.use(DOMAIN.CATEGORIES, categoryRouter);
  app.use(DOMAIN.PRODUCT, productRouter);
  app.use(DOMAIN.SIZE, sizeRouter);
  app.use(DOMAIN.COLOR, colorRouter);
  app.use(DOMAIN.SLIDER, sliderRouter);
  app.use(DOMAIN.SETTING, settingRouter);
  app.use(DOMAIN.AUTH, authRouter);
  
};

export default initRouter;
