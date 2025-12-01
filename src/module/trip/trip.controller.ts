import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { TripService } from "./trip.service";

const createTrip = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = TripService.createTrip(req.body);
    sendResponse(res, 200, "Trip created successfully", result);
  } catch (error) {
    next(error);
  }
};

const addParticipant = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = TripService.addParticipant(req.body, req.params.id);
    sendResponse(res, 200, "Participant added successfully", result);
  } catch (error) {
    next(error);
  }
};

const updateTrip = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = TripService.updateTrip(req.params.id, req.body);
    sendResponse(res, 200, "Trip updated successfully", result);
  } catch (error) {
    next(error);
  }
};

const deleteTrip = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = TripService.deleteTrip(req.params.id);
    sendResponse(res, 200, "Trip deleted successfully", result);
  } catch (error) {
    next(error);
  }
};

const getAllTrip = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, search } = req.query;
    const result = TripService.getAllTrip( parseInt(page as string || "1"), parseInt(limit as string || "10"), search as string);
    sendResponse(res, 200, "Trip fetched successfully", result);
  } catch (error) {
    next(error);
  }
}

const getTrip = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = TripService.getTrip(req.params.id);
    sendResponse(res, 200, "Trip fetched successfully", result);
  } catch (error) {
    next(error);
  }
}

export const TripController = { createTrip, addParticipant, updateTrip, deleteTrip , getAllTrip, getTrip };