import express from "express";
import { verifyRole } from "../middleware/roles/verifyRoles";

export const adminRoute = express.Router();

adminRoute.get("/", verifyRole(["admin"]), (req, res) => {
  const token = req.cookies.token;
  console.log("something should come from here", token);

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  res.status(200).json({ msg: `dashboard data fetched. ${token}` });
});
