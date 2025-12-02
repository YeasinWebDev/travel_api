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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationController = void 0;
const destination_service_1 = require("./destination.service");
const sendResponse_1 = require("../../utils/sendResponse");
const createDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield destination_service_1.DestinationService.createDestination(req.body);
        (0, sendResponse_1.sendResponse)(res, 200, "Division created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getAllDestinations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield destination_service_1.DestinationService.getAllDestinations(parseInt(req.query.page), parseInt(req.query.limit), req.query.search, req.query.division, req.query.bestTimeToVisit);
        (0, sendResponse_1.sendResponse)(res, 200, "Division fetched successfully", result);
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
exports.DestinationController = { createDivision, getAllDestinations, getDestination, updateDestination, deleteDestination };
