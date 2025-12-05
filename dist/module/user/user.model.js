"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: user_interface_1.IUserRole,
        default: user_interface_1.IUserRole.USER,
    },
    travelInterests: [String],
    location: String,
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = mongoose_1.default.model("User", userSchema);
