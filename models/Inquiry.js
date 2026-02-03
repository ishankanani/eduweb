import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    heading: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["PENDING", "IN_ACTION", "SOLVED"],
      default: "PENDING"
    },

    schoolRemark: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);
