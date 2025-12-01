import { Router } from "express";
import { TripController } from "./trip.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";

export const tripRouter = Router();

tripRouter.get("/", TripController.getAllTrip);
tripRouter.get("/:id", TripController.getTrip);
tripRouter.post("/add-participant/:id", checkAuth(IUserRole.ADMIN, IUserRole.USER), TripController.addParticipant);
tripRouter.post("/create", checkAuth(IUserRole.ADMIN, IUserRole.USER), TripController.createTrip);
tripRouter.patch("/:id", checkAuth(IUserRole.ADMIN, IUserRole.USER), TripController.updateTrip);
tripRouter.delete("/:id", checkAuth(IUserRole.ADMIN, IUserRole.USER), TripController.deleteTrip);
