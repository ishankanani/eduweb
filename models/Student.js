import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // 🔑 Link to User (STUDENT login)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    rollNo: {
      type: Number,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male"
    },

    dob: {
      type: Date,
      required: true
    },

    parentName: String,
    parentPhone: String,

    // 🎓 Academic binding
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
    },

    // 🪪 Future use
    photo: String,
    idCard: String,

    documents: [
      {
        type: {
          type: String // DOB, Aadhaar, TC
        },
        url: String,
        verified: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { timestamps: true }
);

/* 🔒 Prevent duplicate roll number per class per school */
studentSchema.index(
  { rollNo: 1, classId: 1, schoolId: 1 },
  { unique: true }
);

export default mongoose.model("Student", studentSchema);
