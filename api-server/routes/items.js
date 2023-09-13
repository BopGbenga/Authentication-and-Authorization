const express = require("express");
const controller = require("../controller.js");
const bodyParser = require("body-parser");
const globalMiddleware = require("../global-middleware");

const itemsRouter = express.Router();

itemsRouter.use(bodyParser.json());

itemsRouter.get("/", globalMiddleware.checkApi_key, controller.getAllItems);

itemsRouter.get("/:id", globalMiddleware.checkApi_key, controller.getAnItem);

itemsRouter.post("/", globalMiddleware.checkAdmin, controller.addItem);

itemsRouter.put("/:id", globalMiddleware.checkAdmin, controller.updateItem);

itemsRouter.delete("/:id", globalMiddleware.checkAdmin, controller.deleteItem);

module.exports = itemsRouter;
