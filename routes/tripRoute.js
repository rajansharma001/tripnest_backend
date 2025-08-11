"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRoute = void 0;
const express_1 = __importDefault(require("express"));
const createTripController_1 = require("../controller/tripController.ts/createTripController");
const verifyRoles_1 = require("../middleware/roles/verifyRoles");
const getLastTrip_1 = require("../controller/tripController.ts/getLastTrip");
const getTripFeedController_1 = require("../controller/tripController.ts/getTripFeedController");
exports.tripRoute = express_1.default.Router();
exports.tripRoute.post("/new-trip", (0, verifyRoles_1.verifyRole)(["admin", "user"]), createTripController_1.createTrip);
exports.tripRoute.get("/get-trip", (0, verifyRoles_1.verifyRole)(["admin", "user"]), getLastTrip_1.getLastTrip);
exports.tripRoute.get("/get-feed", getTripFeedController_1.GetTripFeed);
exports.tripRoute.get("/get-feed/:id", getTripFeedController_1.GetTripFeedById);
