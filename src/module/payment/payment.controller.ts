import { NextFunction, Request, Response } from "express";
import { PaymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import { stripe } from "../../helpers/stripe";
import AppError from "../../errorHelpers/AppError";

const createPayment = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = PaymentService.createPayment(req.body, req.user);
    sendResponse(res, 200, "Payment created successfully", result);
  } catch (error) {
    next(error);
  }
};

const checkWebHook = async(req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret!);
  } catch (error) {
    throw new AppError("Webhook Error", 400);
  }

  const result = await PaymentService.checkWebHook(event);
  sendResponse(res, 200, "Payment created successfully", result);
};

export const PaymentController = {
  createPayment,
  checkWebHook
};
