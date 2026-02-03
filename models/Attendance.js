import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },

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

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // role: TEACHER
      required: true
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },

    records: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true
        },
        status: {
          type: String,
          enum: ["PRESENT", "ABSENT"],
          default: "ABSENT"
        }
      }
    ]
  },
  { timestamps: true }
);

/* 🚫 Prevent duplicate attendance per class per day */
attendanceSchema.index(
  { date: 1, classId: 1, schoolId: 1 },
  { unique: true }
);

export default mongoose.model("Attendance", attendanceSchema);
