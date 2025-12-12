import { NextFunction, Request, Response } from "express";
import { StatsService } from "./stats.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const allStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllStats = await StatsService.allStats();
    sendResponse(res, 200, "Stats fetched successfully", getAllStats);
  } catch (error) {
    next(error);
  }
};


const allStatsForUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllStats = await StatsService.allStatsForUser(req.user as JwtPayload);
    sendResponse(res, 200, "Stats fetched successfully", getAllStats);
  } catch (error) {
    next(error);
  }
};

export const StatsController = { allStats ,allStatsForUser };
