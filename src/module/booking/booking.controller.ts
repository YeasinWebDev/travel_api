import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = {...req.body, user: req.user.userId};
        const result = await BookingService.createBooking(payload, req.user);
        sendResponse(res, 200, "Trip created successfully", result);
    } catch (error) {
        next(error);
    }
}

export const BookingController = {
    createBooking
}