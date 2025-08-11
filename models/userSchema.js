"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    profileImg: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
