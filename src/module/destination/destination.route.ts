import { NextFunction, Request, Response, Router } from "express";
import { DestinationController } from "./destination.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";
import { malterUpload } from "../../helpers/fileUploder";

export const destinationRoute = Router();

destinationRoute.get("/", DestinationController.getAllDestinations);
destinationRoute.get("/:id", DestinationController.getDestination); 

destinationRoute.post('/imageUpload',malterUpload.array("images"), checkAuth(IUserRole.ADMIN), (req:Request, res:Response, next:NextFunction) => {
  return DestinationController.imagesUploader(req, res, next);
})

destinationRoute.post("/create", checkAuth(IUserRole.ADMIN), DestinationController.createDestination);
destinationRoute.patch("/:id", checkAuth(IUserRole.ADMIN), DestinationController.updateDestination);
destinationRoute.delete("/:id", checkAuth(IUserRole.ADMIN), DestinationController.deleteDestination); 
