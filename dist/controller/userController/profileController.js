"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const userSchema_1 = require("../../models/userSchema");
const getProfile = async (req, res) => {
    try {
        const _id = req.user?._id;
        if (!_id) {
            return res.status(404).json({ error: "user id not found" });
        }
        const getUser = await userSchema_1.User.findById({ _id }).select("-password");
        if (!getUser) {
            return res.status(404).json({ error: "user not found" });
        }
        return res.status(200).json({ success: "user found", getUser });
    }
    catch (error) {
        console.log("Error while getting Profile details");
        return res
            .status(500)
            .json({ error: "Bad Request for getting profile details" });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, phone, profileImg } = req.body;
        const _id = req.user?._id;
        if (!_id) {
            return res.status(404).json({ error: "user id not found" });
        }
        const getUser = await userSchema_1.User.findById({ _id }).select("-password");
        if (!getUser) {
            return res.status(404).json({ error: "user not found" });
        }
        const updateProfile = await userSchema_1.User.findByIdAndUpdate(_id, {
            firstName: firstName || getUser.firstName,
            lastName: lastName || getUser.lastName,
            phone: phone || getUser.phone,
            profileImg: profileImg || getUser.profileImg,
        }, { new: true });
        if (!updateProfile) {
            return res
                .status(403)
                .json({ success: "Profile updation failed. Please try again." });
        }
        return res.status(200).json({ success: "Profile Updated Successfully." });
    }
    catch (error) {
        console.log("Error while updating Profile details");
        return res
            .status(500)
            .json({ error: "Bad Request for updating profile details" });
    }
};
exports.updateProfile = updateProfile;
