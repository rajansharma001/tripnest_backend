import express from "express";
import { signupController } from "../controller/authController/signupController";
import { verifEmail } from "../middleware/emails/verifyEmail";
import { signinController } from "../controller/authController/signInController";
import {
  forgetPassword,
  updateForgetPassword,
} from "../controller/authController/forgetPasswordController";
import { logoutController } from "../controller/authController/logoutController";
import { sessionController } from "../controller/authController/sessionController";

export const authRoute = express.Router();

authRoute.post("/signup", signupController);
authRoute.get("/verify-email/:token", verifEmail);
authRoute.post("/signin", signinController);

authRoute.get("/forget-password", forgetPassword);
authRoute.patch("/forget-password-update/:token", updateForgetPassword);

authRoute.get("/logout", logoutController);
authRoute.get("/session-user", sessionController);
