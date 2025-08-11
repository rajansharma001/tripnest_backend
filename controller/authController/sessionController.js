"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../../models/userSchema");
const sessionController = async (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ msg: "Token not found." });
    try {
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error("TOKEN_SECRET is not defined in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const userId = decoded._id;
        const getUser = await userSchema_1.User.findOne({ _id: userId });
        res.status(200).json({ user: getUser });
    }
    catch (err) {
        res.status(403).json({ msg: "Invalid or expired token" });
    }
};
exports.sessionController = sessionController;
