import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number, // base price without GST
      required: true
    },
    gstPercentage: {
      type: Number,
      default: 18
    },
    durationInDays: {
      type: Number, // example: 365 days
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
