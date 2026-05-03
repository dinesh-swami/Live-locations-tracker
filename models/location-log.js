import mongoose from "mongoose";

const locationLogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    userName: {
      type: String,
      trim: true,
      default: null,
    },
    locations: [
      {
        latitude: {
          type: Number,
          required: true,
        },
        longitude: {
          type: Number,
          required: true,
        },
        loggedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    versionKey: false,
  },
);

locationLogSchema.index({ userId: 1, loggedAt: -1 });

const LocationLog =
  mongoose.models.LocationLog ||
  mongoose.model("LocationLog", locationLogSchema);

export default LocationLog;
