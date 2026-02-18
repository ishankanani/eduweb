import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import studentOnly from "../middlewares/studentOnly.js";
import upload from "../utils/upload.js";

import { uploadMaterial } from "../controllers/materialController.js";
import { createExam } from "../controllers/examController.js";
import { addResult } from "../controllers/resultController.js";

import {
  getStudentMaterials,
  getStudentExams,
  getStudentResults
} from "../controllers/studentAcademicController.js";

const router = express.Router();

/* ===== SCHOOL ADMIN ===== */
router.post("/materials", protect, subscriptionCheck, upload.single("file"), uploadMaterial);
router.post("/exams", protect, subscriptionCheck, createExam);
router.post("/results", protect, subscriptionCheck, addResult);

/* ===== STUDENT ===== */
router.get("/student/materials", protect, subscriptionCheck, studentOnly, getStudentMaterials);
router.get("/student/exams", protect, subscriptionCheck, studentOnly, getStudentExams);
router.get("/student/results", protect, subscriptionCheck, studentOnly, getStudentResults);

export default router;
