import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../../models/userSchema";

interface MyPayload extends jwt.JwtPayload {
  _id: string;
}

export const sessionController = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ msg: "Token not found." });

  try {
    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      throw new Error("TOKEN_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, secret) as MyPayload;
    const userId = decoded._id;
    const getUser = await User.findOne({ _id: userId });

    res.status(200).json({ user: getUser });
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired token" });
  }
};
