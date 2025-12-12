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
exports.StatsController = void 0;
const stats_service_1 = require("./stats.service");
const sendResponse_1 = require("../../utils/sendResponse");
const allStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllStats = yield stats_service_1.StatsService.allStats();
        (0, sendResponse_1.sendResponse)(res, 200, "Stats fetched successfully", getAllStats);
    }
    catch (error) {
        next(error);
    }
});
const allStatsForUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllStats = yield stats_service_1.StatsService.allStatsForUser(req.user);
        (0, sendResponse_1.sendResponse)(res, 200, "Stats fetched successfully", getAllStats);
    }
    catch (error) {
        next(error);
    }
});
exports.StatsController = { allStats, allStatsForUser };
