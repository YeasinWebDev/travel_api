import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { Request, Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { userRouter } from "./module/user/user.route";
import { divisionRoute } from "./module/division/division.route";
import { destinationRoute } from "./module/destination/destination.route";
import { tripRouter } from "./module/trip/trip.route";
import { paymentRouter } from "./module/payment/payment.route";
import { PaymentController } from "./module/payment/payment.controller";

const app = express();

app.post("/api/v1/payment/webhook", express.raw({ type: "application/json" }), PaymentController.checkWebHook);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/division", divisionRoute);
app.use("/api/v1/destination", destinationRoute);
app.use("/api/v1/trip", tripRouter);
app.use("/api/v1/payment", paymentRouter);

// global error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
