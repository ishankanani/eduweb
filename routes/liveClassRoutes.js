import express from "express";
import {
  createLiveClass,
  getSchoolLiveClasses,
  getStudentLiveClasses,
  deactivateLiveClass
} from "../controllers/liveClassController.js";

import { protect} from "../middlewares/auth.js";   // ✅ FIXED PATH

const router = express.Router();

/* ADMIN / TEACHER */
router.post("/", protect , createLiveClass);

router.get("/school", protect, getSchoolLiveClasses);

/* STUDENT */
router.get("/student", protect, getStudentLiveClasses);

/* STOP */
router.put("/:id/deactivate", protect, deactivateLiveClass);

export default router;