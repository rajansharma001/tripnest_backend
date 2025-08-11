"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = void 0;
const logoutController = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 3600000,
    });
    res.redirect("/");
};
exports.logoutController = logoutController;
