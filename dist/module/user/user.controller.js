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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utils/sendResponse");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const picture = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const result = yield user_service_1.UserService.createUser(req.body, picture);
        (0, sendResponse_1.sendResponse)(res, 200, "User created successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.loginUser(req.body);
        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        (0, sendResponse_1.sendResponse)(res, 200, "User logged in successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.me(req.params.email);
        (0, sendResponse_1.sendResponse)(res, 200, "User fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.updateUser(req.params.email, req.body);
        (0, sendResponse_1.sendResponse)(res, 200, "User updated successfully", result);
    }
    catch (error) {
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.deleteUser(req.params.email);
        (0, sendResponse_1.sendResponse)(res, 200, "User deleted successfully", result);
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = { createUser, loginUser, me, updateUser, deleteUser };
