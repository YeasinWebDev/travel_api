import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { TripService } from "./trip.service";

const createTrip = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await TripService.createTrip(req.body);
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

const updateTrip = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result =await TripService.updateTrip(req.params.id, req.body);
    sendResponse(res, 200, "Trip updated successfully", result);
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result =await TripService.deleteTrip(req.params.id);
    sendResponse(res, 200, "Trip deleted successfully", result);
  } catch (error) {
    next(error);
  }
};

const getAllTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, search } = req.query;
    const result = await TripService.getAllTrip( parseInt(page as string || "1"), parseInt(limit as string || "10"), search as string);
    sendResponse(res, 200, "Trip fetched successfully", result);
  } catch (error) {
    next(error);
  }
}

const getTrip = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result =await TripService.getTrip(req.params.id);
    sendResponse(res, 200, "Trip fetched successfully", result);
  } catch (error) {
    next(error);
  }
}

export const TripController = { createTrip, addParticipant, updateTrip, deleteTrip , getAllTrip, getTrip };