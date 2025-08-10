import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/userSchema";
import { IUser } from "../../types/express";

interface MyJwtPayload extends jwt.JwtPayload {
  _id: string;
}

export const verifyRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(404).json({ error: "You are not logged-in." });
      }

      const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
      if (!TOKEN_SECRET) {
        return res.status(404).json({ error: "TOKEN_SECRET NOT FOUND." });
      }

      const decode = jwt.verify(token, TOKEN_SECRET) as MyJwtPayload;
      if (!decode) {
        return res.status(403).json({ error: "Invalid or token expired." });
      }

      const existingUser = (await User.findOne({ _id: decode._id })) as IUser;
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
    } catch (error) {
      console.log("Role verification error", error);
      return res
        .status(500)
        .json({ error: "Bad request for role verification." });
    }
  };
};
