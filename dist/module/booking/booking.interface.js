"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBookingStatus = exports.IPaymentStatus = void 0;
var IPaymentStatus;
(function (IPaymentStatus) {
    IPaymentStatus["PENDING"] = "PENDING";
    IPaymentStatus["SUCCESS"] = "SUCCESS";
    IPaymentStatus["FAILED"] = "FAILED";
})(IPaymentStatus || (exports.IPaymentStatus = IPaymentStatus = {}));
var IBookingStatus;
(function (IBookingStatus) {
    IBookingStatus["BOOKED"] = "BOOKED";
    IBookingStatus["CANCELLED"] = "CANCELLED";
})(IBookingStatus || (exports.IBookingStatus = IBookingStatus = {}));
