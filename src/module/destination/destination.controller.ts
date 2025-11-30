import { NextFunction, Request, Response } from "express";
import { DestinationService } from "./destination.service";
import { sendResponse } from "../../utils/sendResponse";

const createDivision = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.createDestination(req.body);
    sendResponse(res, 200, "Division created successfully", result);
  } catch (error) {
    next(error);
  }
};

const getAllDestinations = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.getAllDestinations(parseInt(req.query.page as string), parseInt(req.query.limit as string), req.query.search as string, req.query.division as string , req.query.bestTimeToVisit as string);
    sendResponse(res, 200, "Division fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const getDestination = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.getDestination(req.params.id);
    sendResponse(res, 200, "Division fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const updateDestination = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.updateDestination(req.params.id, req.body);
    sendResponse(res, 200, "Division updated successfully", result);
  } catch (error) {
    next(error);
  }
};

const deleteDestination = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.deleteDestination(req.params.id);
    sendResponse(res, 200, "Division deleted successfully", result);
  } catch (error) {
    next(error);
  }
};

export const DestinationController = { createDivision, getAllDestinations, getDestination, updateDestination, deleteDestination };