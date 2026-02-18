import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import {
  takeAttendance,
  getClassAttendanceByMonth
} from "../controllers/attendanceController.js";
import { updateAttendance } from "../controllers/attendanceController.js";


const router = express.Router();

/* 📝 Take attendance */
router.post("/", protect, subscriptionCheck, takeAttendance);
// attendanceRoutes.js
router.put("/", protect, subscriptionCheck, updateAttendance);

/* 📖 Month-wise class attendance */
router.get(
  "/class/:classId",
  protect,
  subscriptionCheck,
  getClassAttendanceByMonth
);

export default router;
