const express = require("express");
const bodyParser = require("body-parser");
const middleware = require("./users.middleware");
const controller = require("./users.controllers");

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.post("/", middleware.checkBody, controller.creatUser);

module.exports = userRouter;
