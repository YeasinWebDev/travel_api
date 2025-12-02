"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
exports.paymentRouter = (0, express_1.Router)();
exports.paymentRouter.post("/create", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.USER, user_interface_1.IUserRole.ADMIN), payment_controller_1.PaymentController.createPayment);
