"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
const userSchema_1 = require("../../models/userSchema");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendVerificationMail_1 = require("../../middleware/emails/sendVerificationMail");
const signupController = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        if (!firstName || !lastName || !email || !password || !phone) {
            return res
                .status(400)
                .json({ error: "Please fill all the required fields." });
        }
        const phoneRegex = /^[0-9]{7,15}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ error: "Invalid phone number" });
        }
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid Email address" });
        }
        const existingUser = await userSchema_1.User.findOne({ email });
        if (existingUser) {
            console.log("user");
            return res.status(409).json({ error: "User already exists." });
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 12);
        const newUser = await userSchema_1.User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
        });
        if (!newUser) {
            return res.status(403).json({ error: "User creation failed." });
        }
        const token = jsonwebtoken_1.default.sign({ _id: newUser._id }, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
        });
        const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
        const sendMail = await (0, sendVerificationMail_1.sendVerification)({
            email,
            verificationLink,
            firstName,
        });
        return res.status(200).json({ success: "User created successfully." });
    }
    catch (error) {
        console.log("bad request for user creation", error);
        console.error("Signup error:", error);
    }
};
exports.signupController = signupController;
