import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import { getStudentFeePopupData } from "../controllers/feePopupController.js";

const router = express.Router();

/* 📦 Fee popup */
router.get("/:studentId", protect, subscriptionCheck, getStudentFeePopupData);

export default router;
