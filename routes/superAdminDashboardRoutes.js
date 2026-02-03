import express from "express";
import { protect } from "../middlewares/auth.js";
import superAdminOnly from "../middlewares/superAdminOnly.js";
import {
  getDashboardStats,
  getSchoolsWithExpiry,
  getAllPayments
} from "../controllers/superAdminDashboardController.js";

const router = express.Router();

// Dashboard stats
router.get("/stats", protect, superAdminOnly, getDashboardStats);

// Schools list with expiry
router.get("/schools", protect, superAdminOnly, getSchoolsWithExpiry);

// All payments
router.get("/payments", protect, superAdminOnly, getAllPayments);

export default router;
