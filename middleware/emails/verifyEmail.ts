import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/userSchema";

interface MyJwtPayload extends jwt.JwtPayload {
  _id: string;
}
export const verifEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ error: "verification Token not found" });
    }

    const secret = process.env.TOKEN_SECRET as string;

    const decode = jwt.verify(token, secret) as MyJwtPayload;
    if (!decode) {
      return res.status(400).json({ error: "Verification failed." });
    }

    const decodedUser = await User.findOne({ _id: decode._id });

    if (decodedUser.isVerified !== false) {
      return res.status(400).json({ error: "email already verified." });
    }
    decodedUser.isVerified = true;
    await decodedUser.save();

    const newToken = jwt.sign(
      {
        _id: decodedUser._id,
      },
      token,
      { expiresIn: "1h" }
    );

    return res
      .cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .json({ success: "user verified successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Bad Request for email verification." });
  }
};
