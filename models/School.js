import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: String,
    phone: String,
    email: String,

    // Subscription details
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      default: null
    },

    subscriptionExpiry: {
      type: Date,
      default: null
    },

    isActive: {
      type: Boolean,
      default: false // becomes true after payment
    }
  },
  { timestamps: true }
);

export default mongoose.model("School", schoolSchema);
