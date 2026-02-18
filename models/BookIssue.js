import mongoose from "mongoose";

const bookIssueSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LibraryBook",
      required: true
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    issueDate: {
      type: Date,
      default: Date.now
    },

    dueDate: {
      type: Date,
      required: true
    },

    returnDate: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: ["ISSUED", "RETURNED"],
      default: "ISSUED"
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("BookIssue", bookIssueSchema);
