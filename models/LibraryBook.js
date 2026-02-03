import mongoose from "mongoose";

const libraryBookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: String,
    isbn: String,
    category: String,

    totalCopies: {
      type: Number,
      required: true,
      min: 1
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("LibraryBook", libraryBookSchema);
