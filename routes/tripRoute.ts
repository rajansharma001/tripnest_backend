import express from "express";
import { createTrip } from "../controller/tripController.ts/createTripController";
import { verifyRole } from "../middleware/roles/verifyRoles";
import { getLastTrip } from "../controller/tripController.ts/getLastTrip";
import {
  GetTripFeed,
  GetTripFeedById,
} from "../controller/tripController.ts/getTripFeedController";

export const tripRoute = express.Router();

tripRoute.post("/new-trip", verifyRole(["admin", "user"]), createTrip);
tripRoute.get("/get-trip", verifyRole(["admin", "user"]), getLastTrip);
tripRoute.get("/get-feed", GetTripFeed);
tripRoute.get("/get-feed/:id", GetTripFeedById);
