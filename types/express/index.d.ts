import { IUser } from "../UserTypes";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImg?: string;
  role: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
}
