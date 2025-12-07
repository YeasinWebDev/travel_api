import { NextFunction, Request, Response } from "express";
import { PaymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import { stripe } from "../../helpers/stripe";

const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PaymentService.createPayment(req.body, req.user);
    sendResponse(res, 200, "Payment created successfully", result);
  } catch (error) {
    next(error);
  }
};

const checkWebHook = async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let rawBody: Buffer | string;
  
  if (Buffer.isBuffer(req.body)) {
    rawBody = req.body;
  } else if (typeof req.body === 'string') {
    rawBody = req.body;
  } else {
    console.error("Body is already parsed to JSON!");
    return res.status(400).send("Webhook Error: Body was parsed as JSON before signature verification");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret!);
  } catch (error: any) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  await PaymentService.checkWebHook(event);
  res.status(200).send("success");
};


const getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PaymentService.getPaymentById(req.params.id);
    sendResponse(res, 200, "Payment created successfully", result);
  } catch (error) {
    next(error);
  }
}

export const PaymentController = {
  createPayment,
  checkWebHook,
  getPaymentById
};
