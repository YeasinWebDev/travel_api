import { Router } from "express";
import { DivisionController } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";

export const divisionRoute = Router()

divisionRoute.get("/", DivisionController.getAllDivisions)
divisionRoute.get("/:id", DivisionController.getDivision)
divisionRoute.post("/create", checkAuth(IUserRole.ADMIN), DivisionController.createDivision)
divisionRoute.patch("/:id", checkAuth(IUserRole.ADMIN), DivisionController.updateDivision)
divisionRoute.delete("/:id", checkAuth(IUserRole.ADMIN), DivisionController.deleteDivision)