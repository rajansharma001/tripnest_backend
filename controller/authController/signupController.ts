import { NextFunction, Request, Response } from "express";
import { User } from "../../models/userSchema";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerification } from "../../middleware/emails/sendVerificationMail";

type Props = {
  email: string;
  verificationLink: string;
  firstName: string;
};
export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
      return res
        .status(400)
        .json({ error: "Please fill all the required fields." });
    }

    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email address" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user");

      return res.status(409).json({ error: "User already exists." });
    }
    const hashedPassword = await hash(password, 12);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    if (!newUser) {
      return res.status(403).json({ error: "User creation failed." });
    }

    const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;

    const sendMail = await sendVerification({
      email,
      verificationLink,
      firstName,
    });

    return res.status(200).json({ success: "User created successfully." });
  } catch (error) {
    console.log("bad request for user creation", error);
    console.error("Signup error:", error);
  }
};
