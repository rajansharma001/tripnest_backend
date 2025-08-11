"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const verifyRoles_1 = require("../middleware/roles/verifyRoles");
exports.adminRoute = express_1.default.Router();
exports.adminRoute.get("/", (0, verifyRoles_1.verifyRole)(["admin"]), (req, res) => {
    const token = req.cookies.token;
    console.log("something should come from here", token);
    if (!token) {
        return res.status(401).json({ msg: "No token, access denied" });
    }
    res.status(200).json({ msg: `dashboard data fetched. ${token}` });
});
