import { Router } from "express";
import express from "express";
import { createTrip } from "../controller/tripController.ts/createTripController";
import { verifyRole } from "../middleware/roles/verifyRoles";
import { getLastTrip } from "../controller/tripController.ts/getLastTrip";

export const tripRoute = express.Router();

tripRoute.post("/new-trip", verifyRole(["admin", "user"]), createTrip);
tripRoute.get("/get-trip", verifyRole(["admin", "user"]), getLastTrip);
