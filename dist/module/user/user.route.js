"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("./user.interface");
const user_validation_1 = require("./user.validation");
const fileUploder_1 = require("../../helpers/fileUploder");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/:email", user_controller_1.UserController.me);
exports.userRouter.post("/create", fileUploder_1.malterUpload.single("image"), (req, res, next) => {
    req.body = user_validation_1.createUserSchema.parse(JSON.parse(req.body.data));
    return user_controller_1.UserController.createUser(req, res, next);
});
exports.userRouter.post("/login", user_controller_1.UserController.loginUser);
exports.userRouter.patch("/:email", user_controller_1.UserController.updateUser);
exports.userRouter.delete("/:email", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.ADMIN), user_controller_1.UserController.deleteUser);
