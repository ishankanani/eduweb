import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import studentOnly from "../middlewares/studentOnly.js";
import upload from "../utils/upload.js";

import { getStudentFees } from "../controllers/studentFeeController.js";
import { uploadStudentDocument } from "../controllers/studentDocumentController.js";
import { verifyStudentDocument } from "../controllers/studentDocumentAdminController.js";

import {
  createStudent,
  getStudentsByClass,
  deleteStudent
} from "../controllers/studentController.js";

import { getStudentProfile } from "../controllers/studentProfileController.js";

import {
  uploadStudentPhoto,
  uploadStudentIdCard
} from "../controllers/studentIdCardController.js";

import { getMyIdCard } from "../controllers/studentIdCardViewController.js";
import { getMyAttendance } from "../controllers/studentAttendanceController.js";

const router = express.Router();

/* =====================================================
   STUDENT SELF ROUTES (MUST BE FIRST)
   ===================================================== */

router.get(
  "/self/profile",
  protect,
  subscriptionCheck,
  studentOnly,
  getStudentProfile
);

router.get(
  "/self/fees",
  protect,
  subscriptionCheck,
  studentOnly,
  getStudentFees
);

router.post(
  "/self/documents",
  protect,
  subscriptionCheck,
  studentOnly,
  upload.single("file"),
  uploadStudentDocument
);

router.get(
  "/self/id-card",
  protect,
  subscriptionCheck,
  studentOnly,
  getMyIdCard
);

router.get(
  "/self/attendance",
  protect,
  subscriptionCheck,
  studentOnly,
  getMyAttendance
);

/* =====================================================
   SCHOOL ADMIN ROUTES
   ===================================================== */

router.post("/", protect, subscriptionCheck, createStudent);

router.get(
  "/class/:classId",
  protect,
  subscriptionCheck,
  getStudentsByClass
);

router.delete("/:id", protect, subscriptionCheck, deleteStudent);

router.patch(
  "/verify-document",
  protect,
  subscriptionCheck,
  verifyStudentDocument
);

router.post(
  "/upload-photo",
  protect,
  subscriptionCheck,
  upload.single("file"),
  uploadStudentPhoto
);

router.post(
  "/upload-id-card",
  protect,
  subscriptionCheck,
  upload.single("file"),
  uploadStudentIdCard
);
// studentRoutes.js
router.get(
  "/all",
  protect,
  subscriptionCheck,
  async (req, res) => {
    const students = await Student.find({
      schoolId: req.user.schoolId
    }).select("name rollNo");
    res.json(students);
  }
);

export default router;
