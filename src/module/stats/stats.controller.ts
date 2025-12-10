import { NextFunction, Request, Response } from "express";
import { StatsService } from "./stats.service";
import { sendResponse } from "../../utils/sendResponse";

const allStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllStats = await StatsService.allStats();
    sendResponse(res, 200, "Stats fetched successfully", getAllStats);
  } catch (error) {
    next(error);
  }
};

export const StatsController = { allStats };
