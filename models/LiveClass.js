import mongoose from "mongoose";

const liveClassSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    standardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Standard",
      required: true
    },

    divisionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    banner: {
      type: String
    },

    liveLink: {
      type: String,
      required: true
    },

    startDateTime: {
      type: Date,
      required: true
    },

    durationMinutes: {
      type: Number,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const LiveClass = mongoose.model("LiveClass", liveClassSchema);

export default LiveClass;
