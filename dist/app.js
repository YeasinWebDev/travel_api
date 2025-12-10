"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const notFound_1 = require("./middlewares/notFound");
const user_route_1 = require("./module/user/user.route");
const division_route_1 = require("./module/division/division.route");
const destination_route_1 = require("./module/destination/destination.route");
const trip_route_1 = require("./module/trip/trip.route");
const payment_route_1 = require("./module/payment/payment.route");
const payment_controller_1 = require("./module/payment/payment.controller");
const booking_route_1 = require("./module/booking/booking.route");
const review_route_1 = require("./module/review/review.route");
const stats_route_1 = require("./module/stats/stats.route");
const app = (0, express_1.default)();
app.post("/api/v1/webhook", express_1.default.raw({ type: "application/json" }), payment_controller_1.PaymentController.checkWebHook);
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.set("trust proxy", true);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/v1/user", user_route_1.userRouter);
app.use("/api/v1/division", division_route_1.divisionRoute);
app.use("/api/v1/destination", destination_route_1.destinationRoute);
app.use("/api/v1/trip", trip_route_1.tripRouter);
app.use("/api/v1/payment", payment_route_1.paymentRouter);
app.use("/api/v1/booking", booking_route_1.bookingRoute);
app.use("/api/v1/review", review_route_1.reviewRouter);
app.use("/api/v1/stats", stats_route_1.statsRouter);
// global error handlers
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.notFound);
exports.default = app;
