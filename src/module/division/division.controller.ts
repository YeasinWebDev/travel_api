import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { DivisionService } from "./division.service";

const createDivision = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await DivisionService.createDivision(req.body);
        sendResponse(res, 200, "Division created successfully", result);
    } catch (error) {
        next(error);
    }
};

const getAllDivisions = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await DivisionService.getAllDivisions(parseInt(req.query.page as string || "1"), parseInt(req.query.limit as string || "10"), req.query.search as string,);
        sendResponse(res, 200, "Division fetched successfully", result);
    } catch (error) {
        next(error);
    }
};

const getDivision = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await DivisionService.getDivision(req.params.id);
        sendResponse(res, 200, "Division fetched successfully", result);
    } catch (error) {
        next(error);
    }
};

const updateDivision = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await DivisionService.updateDivision(req.params.id, req.body);
        sendResponse(res, 200, "Division updated successfully", result);
    } catch (error) {
        next(error);
    }
};

const deleteDivision = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await DivisionService.deleteDivision(req.params.id);
        sendResponse(res, 200, "Division deleted successfully", result);
    } catch (error) {
        next(error);
    }
};

export const DivisionController = { createDivision, getAllDivisions, getDivision, updateDivision, deleteDivision };