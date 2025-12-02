import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await BookingService.createBooking(req.body);
        sendResponse(res, 200, "Trip created successfully", result);
    } catch (error) {
        next(error);
    }
}

export const BookingController = {
    createBooking
}