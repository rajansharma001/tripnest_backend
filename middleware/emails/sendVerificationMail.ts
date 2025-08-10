import nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";

type Props = {
  email: string;
  verificationLink: string;
  firstName: string;
};
export const sendVerification = async ({
  email,
  verificationLink,
  firstName,
}: Props) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL!,
        pass: process.env.SENDER_PASS!,
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
  } catch (error) {
    console.log("sending verification mail error", error);
  }
};
