"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, res, file) => {
        const isImage = file.memeType.startsWith("Image");
        return {
            folder: "NestTrip_Uploads",
            resourse_type: "auto",
            allowed_formats: ["jpg", "png", "jpeg", "webp"],
            ...(isImage && {
                transformation: [{ width: 500, height: 500, crop: "limit" }],
            }),
        };
    },
});
exports.upload = (0, multer_1.default)({ storage });
