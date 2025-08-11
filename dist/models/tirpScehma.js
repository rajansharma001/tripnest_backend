"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tripSchema = new mongoose_1.default.Schema({
    tripTitle: {
        type: String,
        trim: true,
    },
    tripDescription: {
        type: String,
        trim: true,
    },
    currentLocation: {
        type: String,
        trim: true,
        require: true,
    },
    tripLocation: {
        type: String,
        trim: true,
        require: true,
    },
    budget: {
        type: Number,
        trim: true,
        require: true,
    },
    startDate: {
        type: Date,
        trim: true,
        require: true,
    },
    endDate: {
        type: Date,
        trim: true,
        require: true,
    },
    tripType: {
        type: String,
        enum: ["family", "solo", "friends"],
        trim: true,
        require: true,
    },
    numberOfPeople: {
        type: Number,
        trim: true,
        require: true,
    },
    visibility: {
        type: Boolean,
        default: false,
    },
    tripOverview: {
        type: [mongoose_1.default.Schema.Types.Mixed],
        default: [],
        trim: true,
    },
    dailyPlan: {
        type: [mongoose_1.default.Schema.Types.Mixed],
        default: [],
        trim: true,
    },
    budgetBreakdown: {
        type: [mongoose_1.default.Schema.Types.Mixed],
        default: [],
        trim: true,
    },
    localTips: {
        type: [mongoose_1.default.Schema.Types.Mixed],
        default: [],
        trim: true,
    },
    summary: {
        type: [mongoose_1.default.Schema.Types.Mixed],
        default: [],
        trim: true,
    },
    userId: {
        type: String,
        reqire: true,
    },
}, { timestamps: true });
exports.Trip = mongoose_1.default.models.Trip || mongoose_1.default.model("Trip", tripSchema);
