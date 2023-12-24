import bodyParser = require("body-parser");
import { Express } from "express";

export const commonMiddlewares = (app: Express): Express => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  return app;
}
