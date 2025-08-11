"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicUser = void 0;
const userSchema_1 = require("../../models/userSchema");
const getPublicUser = async (req, res) => {
    try {
        const getPublicUser = await userSchema_1.User.find();
        if (!getPublicUser) {
            return res.status(404).json({ error: "Users not found." });
        }
        return res.status(200).json({ getPublicUser });
    }
    catch (error) {
        console.log(error || "Something went wrong.");
        return res
            .status(500)
            .json({ error: "Bad Request for fetching public users" });
    }
};
exports.getPublicUser = getPublicUser;
