"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateForgetPassword = exports.forgetPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../../models/userSchema");
const sendVerificationMail_1 = require("../../middleware/emails/sendVerificationMail");
const bcryptjs_1 = require("bcryptjs");
const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(404).json({ error: "email not found." });
        }
        const existingUser = await userSchema_1.User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found." });
        }
        const firstName = existingUser.firstName;
        const secret = process.env.TOKEN_SECRET;
        const token = jsonwebtoken_1.default.sign({
            _id: existingUser._id,
        }, secret, { expiresIn: "1h" });
        const verificationLink = `${process.env.CLIENT_URL}/forget-password/${token}`;
        await (0, sendVerificationMail_1.sendVerification)({
            email,
            firstName,
            verificationLink,
        });
        return res
            .status(200)
            .json({ success: `Verification link has been sent to ${email}.` });
    }
    catch (error) {
        console.log("bad request for forgetPassword", error);
        return res.status(500).json({
            error: "Something went wrong while processing Forget Password.",
        });
    }
};
exports.forgetPassword = forgetPassword;
const updateForgetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(404).json({ error: "Token not found." });
        }
        const TOKEN_SECRET = process.env.TOKEN_SECRET;
        const decode = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        if (!decode) {
            return res
                .status(403)
                .json({ error: "Token mismatch. Verification Failed." });
        }
        const existingUser = await userSchema_1.User.findOne({ _id: decode._id });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found." });
        }
        const { newPassword } = req.body;
        if (!newPassword || newPassword.trim().length < 6) {
            return res.status(400).json({ error: "New password is too short." });
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(newPassword, 12);
        const updatePassword = await userSchema_1.User.updateOne({ _id: decode._id }, {
            password: hashedPassword,
        });
        if (updatePassword) {
            return res
                .status(201)
                .json({ success: "Password updated Sucessfully.." });
        }
    }
    catch (error) {
        console.log("bad request for UpdateforgetPassword", error);
        return res.status(500).json({
            error: "Something went wrong while processing update Forget Password.",
        });
    }
};
exports.updateForgetPassword = updateForgetPassword;
