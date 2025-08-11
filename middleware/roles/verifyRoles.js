"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../../models/userSchema");
const verifyRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(404).json({ error: "You are not logged-in." });
            }
            const TOKEN_SECRET = process.env.TOKEN_SECRET;
            if (!TOKEN_SECRET) {
                return res.status(404).json({ error: "TOKEN_SECRET NOT FOUND." });
            }
            const decode = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
            if (!decode) {
                return res.status(403).json({ error: "Invalid or token expired." });
            }
            const existingUser = (await userSchema_1.User.findOne({ _id: decode._id }));
            if (!existingUser) {
                return res.status(404).json({ error: "User not found." });
            }
            if (!allowedRoles.includes(existingUser.role)) {
                return res
                    .status(403)
                    .json({ error: "Access denied. Insufficient permissions." });
            }
            req.user = existingUser;
            next();
        }
        catch (error) {
            console.log("Role verification error", error);
            return res
                .status(500)
                .json({ error: "Bad request for role verification." });
        }
    };
};
exports.verifyRole = verifyRole;
