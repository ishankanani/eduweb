import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    standardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Standard",
      required: true
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
