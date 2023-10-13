const express = require("express");
const Router = express.Router()
const controller = require("../../src/controller/authController");
const {check} = require("express-validator")
const roleMiddleware = require("../middleware/roleMiddleware")
const authMiddleware = require("../middleware/authMiddleware")
Router.post("/registration",
[
check('email', "Укажите адрес электронной почты").notEmpty(),
check('username', "Имя пользователя не может быть пустым").notEmpty().trim(),
check('password', "Пароль должен быть не менее 4 и не более 32 символов").isLength({min: 4, max: 32})
], controller.registration);    
Router.post("/login", controller.login);
Router.get("/users", roleMiddleware(["ADMIN", "WATCHER"]), controller.getUsers);
Router.post("/change-role",roleMiddleware(["ADMIN"]) , controller.changeRole)
Router.post("/user-info", authMiddleware, controller.getUserInfo)
module.exports = Router;
