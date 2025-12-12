"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationRoute = void 0;
const express_1 = require("express");
const destination_controller_1 = require("./destination.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const uploadFileUpload = (0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true
});
exports.destinationRoute = (0, express_1.Router)();
exports.destinationRoute.get("/", destination_controller_1.DestinationController.getAllDestinations);
exports.destinationRoute.get("/:id", destination_controller_1.DestinationController.getDestination);
exports.destinationRoute.post("/imageUpload", uploadFileUpload, destination_controller_1.DestinationController.imagesUploader);
exports.destinationRoute.post("/create", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.ADMIN), destination_controller_1.DestinationController.createDestination);
exports.destinationRoute.patch("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.ADMIN), destination_controller_1.DestinationController.updateDestination);
exports.destinationRoute.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.IUserRole.ADMIN), destination_controller_1.DestinationController.deleteDestination);
