import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    name: String,
    examDate: Date,

    standardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Standard",
      required: true
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
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

export default mongoose.model("Exam", examSchema);
