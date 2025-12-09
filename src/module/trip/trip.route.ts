import { NextFunction, Request, Response, Router } from "express";
import { TripController } from "./trip.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";
import { malterUpload } from "../../helpers/fileUploder";

export const tripRouter = Router();

tripRouter.get("/", TripController.getAllTrip);
tripRouter.get("/:id", TripController.getTrip);
tripRouter.post("/add-participant/:id", checkAuth(IUserRole.ADMIN, IUserRole.USER), TripController.addParticipant);

tripRouter.post("/create", malterUpload.single("image"), checkAuth(IUserRole.ADMIN, IUserRole.USER), (req: Request, res: Response, next: NextFunction) => {
  req.body = JSON.parse(req.body.data)
  return TripController.createTrip(req, res, next);
});
tripRouter.patch("/status/:id", checkAuth(IUserRole.ADMIN, IUserRole.USER), TripController.updateTripStatus);

tripRouter.patch("/:id", checkAuth(IUserRole.ADMIN, IUserRole.USER), TripController.updateTrip);
tripRouter.delete("/:id", checkAuth(IUserRole.ADMIN, IUserRole.USER), TripController.deleteTrip);
