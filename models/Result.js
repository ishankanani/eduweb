import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam"
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    },

    marks: Number,
    grade: String,

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
