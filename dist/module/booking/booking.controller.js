"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const booking_service_1 = require("./booking.service");
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign(Object.assign({}, req.body), { user: req.user.userId });
        const result = yield booking_service_1.BookingService.createBooking(payload, req.user);
        (0, sendResponse_1.sendResponse)(res, 200, "Trip created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.BookingController = {
    createBooking
};
