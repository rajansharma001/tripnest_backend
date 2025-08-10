import { Request, Response } from "express";
export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 3600000,
  });
  res.redirect("/");
};
