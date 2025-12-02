import { Router } from "express";
import { BookingController } from "./booking.controller";

export const bookingRoute = Router()

bookingRoute.post("/create", BookingController.createBooking)