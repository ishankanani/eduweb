import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";

import {
  createTeacher,
  getTeachers
} from "../controllers/teacherController.js";

const router = express.Router();

/* ➕ Add teacher */
router.post("/", protect, subscriptionCheck, createTeacher);

/* 📋 List teachers */
router.get("/", protect, subscriptionCheck, getTeachers);

export default router;
