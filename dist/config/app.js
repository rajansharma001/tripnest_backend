"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dbConnect_1 = require("./dbConnect");
const authRoute_1 = require("../routes/authRoute");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const adminRoute_1 = require("../routes/adminRoute");
const userRoute_1 = require("../routes/userRoute");
const tripRoute_1 = require("../routes/tripRoute");
dotenv_1.default.config();
(0, dbConnect_1.dbConnect)();
const port = process.env.PORT || 7000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));
app.use("/api/auth", authRoute_1.authRoute);
app.get("/", (req, res) => {
    res.send("Server working");
});
app.use("/admin", adminRoute_1.adminRoute);
app.use("/user", userRoute_1.userRoute);
app.use("/trip", tripRoute_1.tripRoute);
app.listen(port, () => {
    console.log(`App running at port ${port}`);
});
