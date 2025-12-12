import { Router } from "express";
import { DestinationController } from "./destination.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { IUserRole } from "../user/user.interface";
import fileUpload from "express-fileupload";

const uploadFileUpload = fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  createParentPath: true
});

export const destinationRoute = Router();

destinationRoute.get("/", DestinationController.getAllDestinations);
destinationRoute.get("/:id", DestinationController.getDestination); 

destinationRoute.post("/imageUpload", uploadFileUpload, DestinationController.imagesUploader);

destinationRoute.post("/create", checkAuth(IUserRole.ADMIN), DestinationController.createDestination);
destinationRoute.patch("/:id", checkAuth(IUserRole.ADMIN), DestinationController.updateDestination);
destinationRoute.delete("/:id", checkAuth(IUserRole.ADMIN), DestinationController.deleteDestination); 
