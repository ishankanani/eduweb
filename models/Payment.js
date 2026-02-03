import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School"
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan"
    },

    paymentType: {
      type: String,
      enum: ["NEW", "RENEWAL"],
      default: "NEW"
    },

    amount: Number,
    gstAmount: Number,
    totalAmount: Number,

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    status: {
      type: String,
      enum: ["CREATED", "SUCCESS", "FAILED"],
      default: "CREATED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
