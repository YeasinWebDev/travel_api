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
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const sendResponse_1 = require("../../utils/sendResponse");
const stripe_1 = require("../../helpers/stripe");
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
    let rawBody;
    if (Buffer.isBuffer(req.body)) {
        rawBody = req.body;
    }
    else if (typeof req.body === 'string') {
        rawBody = req.body;
    }
    else {
        console.error("Body is already parsed to JSON!");
        return res.status(400).send("Webhook Error: Body was parsed as JSON before signature verification");
    }
    let event;
    try {
        event = stripe_1.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }
    catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
    yield payment_service_1.PaymentService.checkWebHook(event);
    res.status(200).send("success");
});
exports.PaymentController = {
    createPayment,
    checkWebHook,
};
