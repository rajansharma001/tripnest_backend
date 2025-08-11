"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastTrip = void 0;
const tirpScehma_1 = require("../../models/tirpScehma");
const getLastTrip = async (req, res) => {
    try {
        const user = req.user;
        const latestTrip = await tirpScehma_1.Trip.findOne({ userId: user._id }).sort({
            createdAt: -1,
        });
        return res.status(200).json({ latestTrip });
    }
    catch (error) {
        console.log("Bad Request for getting last Trip.", error);
        return res
            .status(500)
            .json({ error: "Bad Request for Getting last Trip." });
    }
};
exports.getLastTrip = getLastTrip;
