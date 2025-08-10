import { Request, Response } from "express";
import { User } from "../../models/userSchema";
import { IUser } from "../../types/express";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const _id = req.user?._id;

    if (!_id) {
      return res.status(404).json({ error: "user id not found" });
    }

    const getUser = await User.findById({ _id }).select("-password");
    if (!getUser) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.status(200).json({ success: "user found", getUser });
  } catch (error) {
    console.log("Error while getting Profile details");
    return res
      .status(500)
      .json({ error: "Bad Request for getting profile details" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phone, profileImg } = req.body as IUser;

    const _id = req.user?._id;
    if (!_id) {
      return res.status(404).json({ error: "user id not found" });
    }

    const getUser = await User.findById({ _id }).select("-password");
    if (!getUser) {
      return res.status(404).json({ error: "user not found" });
    }

    const updateProfile = await User.findByIdAndUpdate(
      _id,
      {
        firstName: firstName || getUser.firstName,
        lastName: lastName || getUser.lastName,
        phone: phone || getUser.phone,
        profileImg: profileImg || getUser.profileImg,
      },
      { new: true }
    );

    if (!updateProfile) {
      return res
        .status(403)
        .json({ success: "Profile updation failed. Please try again." });
    }

    return res.status(200).json({ success: "Profile Updated Successfully." });
  } catch (error) {
    console.log("Error while updating Profile details");
    return res
      .status(500)
      .json({ error: "Bad Request for updating profile details" });
  }
};
