import { Router } from "express";
import {
  getProfile,
  updateProfile,
} from "../controller/userController/profileController";
import { verifyRole } from "../middleware/roles/verifyRoles";
import { upload } from "../utlis/fileUpload";

export const userRoute = Router();

userRoute.get("/profile", verifyRole(["admin", "user"]), getProfile);
userRoute.patch(
  "/profile-update/:id",
  upload.single("profileImg"),
  verifyRole(["admin", "user"]),
  updateProfile
);
