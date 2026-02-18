import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import studentOnly from "../middlewares/studentOnly.js";

import {
  createInquiry,
  getMyInquiries
} from "../controllers/studentInquiryController.js";

import {
  getSchoolInquiries,
  updateInquiryStatus
} from "../controllers/schoolInquiryController.js";

const router = express.Router();

/* ===== STUDENT ===== */
router.post(
  "/student",
  protect,
  subscriptionCheck,
  studentOnly,
  createInquiry
);

router.get(
  "/student",
  protect,
  subscriptionCheck,
  studentOnly,
  getMyInquiries
);

/* ===== SCHOOL ADMIN ===== */
router.get(
  "/school",
  protect,
  subscriptionCheck,
  getSchoolInquiries
);

router.patch(
  "/school",
  protect,
  subscriptionCheck,
  updateInquiryStatus
);

export default router;
