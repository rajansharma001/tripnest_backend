"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../../models/userSchema");
const verifEmail = async (req, res, next) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(400).json({ error: "verification Token not found" });
        }
        const secret = process.env.TOKEN_SECRET;
        const decode = jsonwebtoken_1.default.verify(token, secret);
        if (!decode) {
            return res.status(400).json({ error: "Verification failed." });
        }
        const decodedUser = await userSchema_1.User.findOne({ _id: decode._id });
        if (decodedUser.isVerified !== false) {
            return res.status(400).json({ error: "email already verified." });
        }
        decodedUser.isVerified = true;
        await decodedUser.save();
        const newToken = jsonwebtoken_1.default.sign({
            _id: decodedUser._id,
        }, token, { expiresIn: "1h" });
        return res
            .cookie("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        })
            .json({ success: "user verified successfully." });
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Bad Request for email verification." });
    }
};
exports.verifEmail = verifEmail;
