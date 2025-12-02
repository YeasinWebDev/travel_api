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
exports.DivisionController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const division_service_1 = require("./division.service");
const createDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield division_service_1.DivisionService.createDivision(req.body);
        (0, sendResponse_1.sendResponse)(res, 200, "Division created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getAllDivisions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield division_service_1.DivisionService.getAllDivisions(parseInt(req.query.page || "1"), parseInt(req.query.limit || "10"), req.query.search);
        (0, sendResponse_1.sendResponse)(res, 200, "Division fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const getDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield division_service_1.DivisionService.getDivision(req.params.id);
        (0, sendResponse_1.sendResponse)(res, 200, "Division fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const updateDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield division_service_1.DivisionService.updateDivision(req.params.id, req.body);
        (0, sendResponse_1.sendResponse)(res, 200, "Division updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const deleteDivision = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield division_service_1.DivisionService.deleteDivision(req.params.id);
        (0, sendResponse_1.sendResponse)(res, 200, "Division deleted successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.DivisionController = { createDivision, getAllDivisions, getDivision, updateDivision, deleteDivision };
