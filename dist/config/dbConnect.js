"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = () => {
    mongoose_1.default
        .connect(process.env.MONGO_URL)
        .then(() => {
        console.log("DB CONNECTED SUCCESS!");
    })
        .catch((error) => {
        console.log("DB CONNECTION FAILED:", error);
    });
};
exports.dbConnect = dbConnect;
