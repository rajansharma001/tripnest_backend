import { Request, Response } from "express";
import { Trip } from "../../models/tirpScehma";

export const GetTripFeed = async (req: Request, res: Response) => {
  try {
    const getTripFeed = await Trip.find().sort({
      createdAt: -1,
    });
    if (!getTripFeed) {
      return res.status(403).json({ error: "Trips not found." });
    }
    return res
      .status(200)
      .json({ success: "Trips fetched successfully.", getTripFeed });
  } catch (error) {
    console.log("Bad Request for fetching Trip Feed.");
    return res
      .status(500)
      .json({ error: "Something went wrong while fetching feed." });
  }
};

export const GetTripFeedById = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const getTripFeedById = await Trip.findOne({ _id });
    if (!getTripFeedById) {
      return res.status(403).json({ error: "Trip not found." });
    }
    return res
      .status(200)
      .json({ success: "Trips fetched By Id successfully.", getTripFeedById });
  } catch (error) {
    console.log("Bad Request for fetching Trip By Id.");
    return res
      .status(500)
      .json({ error: "Something went wrong while fetching feed by Id." });
  }
};
