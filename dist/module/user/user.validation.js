"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(3),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    travelInterests: zod_1.default.array(zod_1.default.string()).optional(),
    location: zod_1.default.string().optional()
});
