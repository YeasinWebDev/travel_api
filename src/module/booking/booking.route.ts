import { Router } from "express";
import { BookingController } from "./booking.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";

export const bookingRoute = Router()

bookingRoute.post("/create", checkAuth(IUserRole.USER,IUserRole.ADMIN), BookingController.createBooking)