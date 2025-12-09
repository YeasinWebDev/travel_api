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
exports.UserService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const filterWithPagination_1 = require("../../utils/filterWithPagination");
const userToken_1 = require("../../utils/userToken");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (payload, profileImage) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ email: payload.email });
    if (isExist) {
        throw new AppError_1.default("User already exist", 400);
    }
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, 10);
    payload.password = hashedPassword;
    if (profileImage) {
        payload.profileImage = profileImage;
    }
    const user = user_model_1.User.create(payload);
    return user;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new AppError_1.default("User does not exist", 400);
    }
    if (user.status === "inactive") {
        throw new AppError_1.default("User is inactive", 400);
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default("Password does not match", 400);
    }
    const token = (0, userToken_1.createToken)(user);
    return { user, accessToken: token.accessToken, refreshToken: token.refreshToken };
});
const me = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default("User does not exist", 400);
    }
    const res = {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        profileImage: user.profileImage,
        location: user.location,
        travelInterests: user.travelInterests,
    };
    return res;
});
const updateUser = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ email }, payload, { new: true });
    if (!user) {
        throw new AppError_1.default("User does not exist", 400);
    }
    return user;
});
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndDelete({ email });
    if (!user) {
        throw new AppError_1.default("User does not exist", 400);
    }
    return user;
});
const updateUserStatus = (email, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ email }, { status }, { new: true });
    if (!user) {
        throw new AppError_1.default("User does not exist", 400);
    }
    return user;
});
const getAll = (page, limit, search, userData, status) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, filterWithPagination_1.filterWithPagination)(user_model_1.User, { page, limit, search, searchFields: ["name", "email"], filters: {
            email: { $ne: userData.email },
            status
        } });
    return users;
});
exports.UserService = { createUser, loginUser, me, updateUser, deleteUser, getAll, updateUserStatus };
