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
exports.DivisionService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const filterWithPagination_1 = require("../../utils/filterWithPagination");
const division_model_1 = require("./division.model");
const createDivision = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield division_model_1.Division.findOne({ name: payload.name });
    if (isExists)
        throw new AppError_1.default("Division already exist", 400);
    const division = division_model_1.Division.create(payload);
    return division;
});
const getAllDivisions = (page, limit, search) => __awaiter(void 0, void 0, void 0, function* () {
    const divisions = yield (0, filterWithPagination_1.filterWithPagination)(division_model_1.Division, { page, limit, search, searchFields: ["name"] });
    return divisions;
});
const getDivision = (id) => {
    const isExists = division_model_1.Division.findById(id);
    if (!isExists)
        throw new AppError_1.default("Division does not exist", 400);
    const division = division_model_1.Division.findById(id);
    return division;
};
const updateDivision = (id, payload) => {
    const isExists = division_model_1.Division.findById(id);
    if (!isExists)
        throw new AppError_1.default("Division does not exist", 400);
    const division = division_model_1.Division.findByIdAndUpdate(id, payload, { new: true });
    return division;
};
const deleteDivision = (id) => {
    const isExists = division_model_1.Division.findById(id);
    if (!isExists)
        throw new AppError_1.default("Division does not exist", 400);
    const division = division_model_1.Division.findByIdAndDelete(id);
    return division;
};
exports.DivisionService = {
    createDivision,
    getAllDivisions,
    getDivision,
    updateDivision,
    deleteDivision,
};
