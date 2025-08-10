import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, res: Response, file: any) => {
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

export const upload = multer({ storage });
