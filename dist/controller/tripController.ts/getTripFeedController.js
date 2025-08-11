"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTripFeedById = exports.GetTripFeed = void 0;
const tirpScehma_1 = require("../../models/tirpScehma");
const GetTripFeed = async (req, res) => {
    try {
        const getTripFeed = await tirpScehma_1.Trip.find().sort({
            createdAt: -1,
        });
        if (!getTripFeed) {
            return res.status(403).json({ error: "Trips not found." });
        }
        return res
            .status(200)
            .json({ success: "Trips fetched successfully.", getTripFeed });
    }
    catch (error) {
        console.log("Bad Request for fetching Trip Feed.");
        return res
            .status(500)
            .json({ error: "Something went wrong while fetching feed." });
    }
};
exports.GetTripFeed = GetTripFeed;
const GetTripFeedById = async (req, res) => {
    try {
        const _id = req.params.id;
        const getTripFeedById = await tirpScehma_1.Trip.findOne({ _id });
        if (!getTripFeedById) {
            return res.status(403).json({ error: "Trip not found." });
        }
        return res
            .status(200)
            .json({ success: "Trips fetched By Id successfully.", getTripFeedById });
    }
    catch (error) {
        console.log("Bad Request for fetching Trip By Id.");
        return res
            .status(500)
            .json({ error: "Something went wrong while fetching feed by Id." });
    }
};
exports.GetTripFeedById = GetTripFeedById;
