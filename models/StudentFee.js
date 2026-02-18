import mongoose from "mongoose";

const studentFeeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    standardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Standard",
      required: true
    },

    baseAmount: {
      type: Number,
      required: true
    },

    discountAmount: {
      type: Number,
      default: 0
    },

    totalPayable: {
      type: Number,
      required: true
    },

    totalPaid: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["UNPAID", "PARTIAL", "PAID"],
      default: "UNPAID"
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("StudentFee", studentFeeSchema);
