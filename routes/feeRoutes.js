import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import {
  getStudentFeesByClass,
  addPayment
} from "../controllers/feeController.js";

const router = express.Router();

/* 📋 Get student fees (class-wise / dashboard) */
router.get("/class/:classId", protect, subscriptionCheck, getStudentFeesByClass);

/* 💰 Add manual payment (partial / full) */
router.post("/pay", protect, subscriptionCheck, addPayment);

export default router;
