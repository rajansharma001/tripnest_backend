import { Request, Response } from "express";
import { User } from "../../models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerification } from "../../middleware/emails/sendVerificationMail";

export const signinController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email address" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      console.log("user not found.");
      return res.status(403).json({ error: "User does not exists." });
    }

    if (!existingUser.isVerified) {
      const token = jwt.sign(
        { _id: existingUser._id, email },
        process.env.TOKEN_SECRET!,
        { expiresIn: "1h" }
      );

      const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;

      const sendMail = await sendVerification({
        email,
        verificationLink,
        firstName: existingUser.firstName,
      });

      return res.status(400).json({
        error:
          "Your email is not verified yet. A new verification link has been sent to your inbox.",
      });
    }

    const comparedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparedPassword) {
      console.log("password did not matched.");
      return res.status(402).json({ error: "Password does not match!" });
    }

    const secret = process.env.TOKEN_SECRET as string;

    const token = jwt.sign(
      {
        _id: existingUser._id,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 3600000,
      })
      .status(200)
      .json({ success: "Logged in successfully." });
  } catch (error) {
    console.log("error while requesting signin", error);
    return res.status(500).json({ error: "Bad Request for Signin" });
  }
};
