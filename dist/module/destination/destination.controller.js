"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationController = exports.imagesUploader = void 0;
const destination_service_1 = require("./destination.service");
const sendResponse_1 = require("../../utils/sendResponse");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const fs_1 = __importDefault(require("fs"));
const createDestination = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield destination_service_1.DestinationService.createDestination(req.body);
        (0, sendResponse_1.sendResponse)(res, 200, "Destination created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const imagesUploader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        if (!req.files || !req.files.images) {
            return res.status(400).json({ message: "No images uploaded" });
        }
        // @ts-ignore
        const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        const uploadedUrls = [];
        for (const file of files) {
            const fileBuffer = yield fs_1.default.promises.readFile(file.tempFilePath);
            const uploaded = yield (0, cloudinary_config_1.uploadBufferToCloudinary)(fileBuffer, file.name);
            uploadedUrls.push(uploaded.secure_url);
        }
        return res.json({ urls: uploadedUrls });
    }
    catch (error) {
        res.status(500).json({ error: "Upload failed" });
    }
});
exports.imagesUploader = imagesUploader;
const getAllDestinations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield destination_service_1.DestinationService.getAllDestinations(parseInt(req.query.page || "1"), parseInt(req.query.limit || "5"), req.query.search, req.query.division, req.query.bestTimeToVisit);
        (0, sendResponse_1.sendResponse)(res, 200, "Destination fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getDestination = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield destination_service_1.DestinationService.getDestination(req.params.id);
        (0, sendResponse_1.sendResponse)(res, 200, "Division fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const updateDestination = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield destination_service_1.DestinationService.updateDestination(req.params.id, req.body);
        (0, sendResponse_1.sendResponse)(res, 200, "Division updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const deleteDestination = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield destination_service_1.DestinationService.deleteDestination(req.params.id);
        (0, sendResponse_1.sendResponse)(res, 200, "Division deleted successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.DestinationController = { createDestination, getAllDestinations, getDestination, updateDestination, deleteDestination, imagesUploader: exports.imagesUploader };
