import { NextFunction, Request, Response } from "express";
import { DestinationService } from "./destination.service";
import { sendResponse } from "../../utils/sendResponse";
import { uploadBufferToCloudinary } from "../../config/cloudinary.config";
import fs from "fs";

const createDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.createDestination(req.body);
    sendResponse(res, 200, "Destination created successfully", result);
  } catch (error) {
    next(error);
  }
};

export const imagesUploader = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // @ts-ignore
    const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

    const uploadedUrls = [];

    for (const file of files) {
      const fileBuffer = await fs.promises.readFile(file.tempFilePath);
      const uploaded = await uploadBufferToCloudinary(fileBuffer, file.name);
      uploadedUrls.push(uploaded!.secure_url);
    }

    return res.json({ urls: uploadedUrls });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
};


const getAllDestinations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.getAllDestinations(
      parseInt((req.query.page as string) || "1"),
      parseInt((req.query.limit as string) || "6"),
      req.query.search as string,
      req.query.division as string,
      req.query.bestTimeToVisit as string
    );
    sendResponse(res, 200, "Destination fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const getDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.getDestination(req.params.id);
    sendResponse(res, 200, "Division fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

const updateDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.updateDestination(req.params.id, req.body);
    sendResponse(res, 200, "Division updated successfully", result);
  } catch (error) {
    next(error);
  }
};

const deleteDestination = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await DestinationService.deleteDestination(req.params.id);
    sendResponse(res, 200, "Division deleted successfully", result);
  } catch (error) {
    next(error);
  }
};

export const DestinationController = { createDestination, getAllDestinations, getDestination, updateDestination, deleteDestination, imagesUploader };
