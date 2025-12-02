"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
exports.bookingRoute = (0, express_1.Router)();
exports.bookingRoute.post("/create", booking_controller_1.BookingController.createBooking);
