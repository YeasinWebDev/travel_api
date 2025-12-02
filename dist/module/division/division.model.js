"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Division = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const divisionSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.Division = mongoose_1.default.model("Division", divisionSchema);
