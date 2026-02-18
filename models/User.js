import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        "SUPER_ADMIN",
        "SCHOOL_ADMIN",
        "TEACHER",
        "ACCOUNTANT",
        "STAFF",
        "STUDENT"
      ],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
