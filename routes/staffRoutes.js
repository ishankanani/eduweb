import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import {
  createStaff,
  getStaff
} from "../controllers/staffController.js";

const router = express.Router();

router.post("/", protect, subscriptionCheck, createStaff);
router.get("/", protect, subscriptionCheck, getStaff);

export default router;
