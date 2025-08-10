import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/userSchema";
import { sendVerification } from "../../middleware/emails/sendVerificationMail";
import { hash } from "bcryptjs";
interface MyJwtPayload extends jwt.JwtPayload {
  _id: string;
}
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ error: "email not found." });
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const firstName = existingUser.firstName;
    const secret = process.env.TOKEN_SECRET as string;

    const token = jwt.sign(
      {
        _id: existingUser._id,
      },
      secret,
      { expiresIn: "1h" }
    );
    const verificationLink = `${process.env.CLIENT_URL}/forget-password/${token}`;
    await sendVerification({
      email,
      firstName,
      verificationLink,
    });

    return res
      .status(200)
      .json({ success: `Verification link has been sent to ${email}.` });
  } catch (error) {
    console.log("bad request for forgetPassword", error);
    return res.status(500).json({
      error: "Something went wrong while processing Forget Password.",
    });
  }
};

export const updateForgetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    if (!token) {
      return res.status(404).json({ error: "Token not found." });
    }

    const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
    const decode = jwt.verify(token, TOKEN_SECRET) as MyJwtPayload;
    if (!decode) {
      return res
        .status(403)
        .json({ error: "Token mismatch. Verification Failed." });
    }

    const existingUser = await User.findOne({ _id: decode._id });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    const { newPassword } = req.body;
    if (!newPassword || newPassword.trim().length < 6) {
      return res.status(400).json({ error: "New password is too short." });
    }

    const hashedPassword = await hash(newPassword, 12);

    const updatePassword = await User.updateOne(
      { _id: decode._id },
      {
        password: hashedPassword,
      }
    );

    if (updatePassword) {
      return res
        .status(201)
        .json({ success: "Password updated Sucessfully.." });
    }
  } catch (error) {
    console.log("bad request for UpdateforgetPassword", error);
    return res.status(500).json({
      error: "Something went wrong while processing update Forget Password.",
    });
  }
};
