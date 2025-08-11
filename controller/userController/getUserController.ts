import { Request, Response } from "express";
import { User } from "../../models/userSchema";

export const getPublicUser = async (req: Request, res: Response) => {
  try {
    const getPublicUser = await User.find();
    if (!getPublicUser) {
      return res.status(404).json({ error: "Users not found." });
    }
    return res.status(200).json({ getPublicUser });
  } catch (error) {
    console.log(error || "Something went wrong.");
    return res
      .status(500)
      .json({ error: "Bad Request for fetching public users" });
  }
};
