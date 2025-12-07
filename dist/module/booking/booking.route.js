"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
exports.bookingRoute = (0, express_1.Router)();
exports.bookingRoute.post("/create", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.USER, user_interface_1.IUserRole.ADMIN), booking_controller_1.BookingController.createBooking);
