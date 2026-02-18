import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import {
  createOrUpdateStandardFee,
  getActiveStandardFee,
  getStandardFeeHistory
} from "../controllers/standardFeeController.js";

const router = express.Router();

/* ➕ Create / Update yearly fee */
router.post("/", protect, subscriptionCheck, createOrUpdateStandardFee);

/* 📋 Get active fee */
router.get("/active/:standardId", protect, subscriptionCheck, getActiveStandardFee);

/* 🕘 Fee history */
router.get("/history/:standardId", protect, subscriptionCheck, getStandardFeeHistory);

export default router;
