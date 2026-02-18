import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },

    designation: String, // Teacher, Accountant, Clerk
    qualifications: String,

    salary: {
      amount: Number,
      paymentType: {
        type: String,
        enum: ["Monthly", "Hourly"],
        default: "Monthly"
      }
    },

    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],

    standards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Standard"
      }
    ],

    bankDetails: {
      bankName: String,
      accountNo: String,
      ifsc: String
    },

    joiningDate: {
      type: Date,
      default: Date.now
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);
