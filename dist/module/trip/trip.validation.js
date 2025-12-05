"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.tripSchema = zod_1.default.object({
    name: zod_1.default.string().min(3),
    description: zod_1.default.string().min(3),
    startDate: zod_1.default.string().min(3),
    endDate: zod_1.default.string().min(3),
    price: zod_1.default.number(),
    image: zod_1.default.string().min(3),
    capacity: zod_1.default.number(),
    destination: zod_1.default.string().min(3),
});
