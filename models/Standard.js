import mongoose from "mongoose";

const standardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    // Fixed fee for this standard (current year)
    baseFee: {
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

export default mongoose.model("Standard", standardSchema);
