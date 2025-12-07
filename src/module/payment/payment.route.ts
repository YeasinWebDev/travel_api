import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";

export const paymentRouter = Router()

paymentRouter.get("/:id", checkAuth(IUserRole.USER,IUserRole.ADMIN), PaymentController.getPaymentById)
paymentRouter.post("/create",checkAuth(IUserRole.USER,IUserRole.ADMIN), PaymentController.createPayment)