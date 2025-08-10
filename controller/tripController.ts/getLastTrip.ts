import { Request, Response } from "express";
import { Trip } from "../../models/tirpScehma";

export const getLastTrip = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const latestTrip = await Trip.findOne({ userId: user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ latestTrip });
  } catch (error) {
    console.log("Bad Request for getting last Trip.", error);
    return res
      .status(500)
      .json({ error: "Bad Request for Getting last Trip." });
  }
};
