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
exports.deleteMultipleCloudinaryImages = exports.extractPublicIdFromUrl = exports.malterUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_config_1 = require("../config/cloudinary.config");
const stroage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_config_1.CloudinaryUpload,
    params: {
        public_id: (req, file) => {
            const fileName = file.originalname
                .toLocaleLowerCase()
                .replace(/\s+/g, "-")
                .replace(/\./g, "-")
                .replace(/[^a-z0-9.-]/g, ""); // non alpha numeric - !@#$
            const uniqueFIleName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileName;
            return uniqueFIleName;
        },
    },
});
exports.malterUpload = (0, multer_1.default)({ storage: stroage, limits: { fileSize: 10 * 1024 * 1024 } });
const extractPublicIdFromUrl = (url) => {
    const parts = url.split("/");
    const fileWithExtension = parts.pop();
    const publicId = fileWithExtension === null || fileWithExtension === void 0 ? void 0 : fileWithExtension.split(".")[0];
    return publicId;
};
exports.extractPublicIdFromUrl = extractPublicIdFromUrl;
const deleteMultipleCloudinaryImages = (urls) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicIds = urls.map((url) => (0, exports.extractPublicIdFromUrl)(url));
        const results = yield Promise.all(publicIds.map((id) => cloudinary_config_1.CloudinaryUpload.uploader.destroy(id)));
        return results;
    }
    catch (error) {
        console.error("❌ Failed to delete images:", error);
        throw new Error("Failed to delete multiple images");
    }
});
exports.deleteMultipleCloudinaryImages = deleteMultipleCloudinaryImages;
