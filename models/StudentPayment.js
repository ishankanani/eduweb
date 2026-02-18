import mongoose from "mongoose";

const studentPaymentSchema = new mongoose.Schema(
  {
    studentFeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentFee",
      required: true
    },

    amountPaid: {
      type: Number,
      required: true,
      min: 1
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Cheque", "Bank", "Other"],
      default: "Cash"
    },

    remarks: String,

    paidOn: {
      type: Date,
      default: Date.now
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("StudentPayment", studentPaymentSchema);
