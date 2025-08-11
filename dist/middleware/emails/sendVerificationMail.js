"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendVerification = async ({ email, verificationLink, firstName, }) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASS,
            },
        });
        const sendMail = await transporter.sendMail({
            from: `"NestTrip"  <${process.env.SENDER_EMAIL}>`,
            to: email,
            subject: "Verify your email to login",
            html: `
        <p>Hi ${firstName},</p>
        <p>Thank you for signing up at NestTrip!</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>This link will expire in 1 hour.</p>
        `,
        });
    }
    catch (error) {
        console.log("sending verification mail error", error);
    }
};
exports.sendVerification = sendVerification;
