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
exports.Trip = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tripSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    destination: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Destination",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    participants: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
                required: false,
            },
            paymentId: {
                type: String,
                required: false,
            },
            numberOfGuests: {
                type: Number,
                required: false,
            },
            joinedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    isFull: {
        type: Boolean,
        default: false,
    },
    capacity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active",
    },
}, {
    timestamps: true,
    versionKey: false,
});
tripSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.participants)
            return;
        const totalGuests = this.participants.reduce((sum, p) => sum + p.numberOfGuests, 0);
        this.isFull = totalGuests >= this.capacity;
    });
});
exports.Trip = mongoose_1.default.model("Trip", tripSchema);
