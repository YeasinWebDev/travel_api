import { Router } from "express";
import { DestinationController } from "./destination.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";

export const destinationRoute = Router()

destinationRoute.get("/", DestinationController.getAllDestinations)
destinationRoute.get("/:id", DestinationController.getDestination)
destinationRoute.post("/create", checkAuth(IUserRole.ADMIN), DestinationController.createDivision)
destinationRoute.patch("/:id", checkAuth(IUserRole.ADMIN), DestinationController.updateDestination)
destinationRoute.delete("/:id", checkAuth(IUserRole.ADMIN), DestinationController.deleteDestination)