import { Router } from "express";
import { StatsController } from "./stats.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";

export const statsRouter = Router()

statsRouter.get("/",checkAuth(IUserRole.ADMIN), StatsController.allStats)
statsRouter.get("/user", checkAuth(IUserRole.ADMIN,IUserRole.USER), StatsController.allStatsForUser)