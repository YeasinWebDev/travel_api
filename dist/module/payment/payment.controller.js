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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const sendResponse_1 = require("../../utils/sendResponse");
const stripe_1 = require("../../helpers/stripe");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const createPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield payment_service_1.PaymentService.createPayment(req.body, req.user);
        (0, sendResponse_1.sendResponse)(res, 200, "Payment created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const checkWebHook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe_1.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }
    catch (error) {
        throw new AppError_1.default("Webhook Error", 400);
    }
    const result = yield payment_service_1.PaymentService.checkWebHook(event);
    (0, sendResponse_1.sendResponse)(res, 200, "Payment created successfully", result);
});
exports.PaymentController = {
    createPayment,
    checkWebHook
};
