import { Express } from "express";
import { DOMAIN } from "../helpers/const";
import categoryRouter from "./category.router";

const initRouter = (app: Express) => {
  app.use(DOMAIN.CATEGORIES, categoryRouter);
};

export default initRouter;
