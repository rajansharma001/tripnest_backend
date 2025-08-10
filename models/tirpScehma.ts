import mongoose, { Model } from "mongoose";

const tripSchema = new mongoose.Schema(
  {
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
      type: [mongoose.Schema.Types.Mixed],
      default: [],
      trim: true,
    },
    dailyPlan: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
      trim: true,
    },
    budgetBreakdown: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
      trim: true,
    },
    localTips: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
      trim: true,
    },
    summary: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
      trim: true,
    },
    userId: {
      type: String,
      reqire: true,
    },
  },
  { timestamps: true }
);

export const Trip = mongoose.models.Trip || mongoose.model("Trip", tripSchema);
