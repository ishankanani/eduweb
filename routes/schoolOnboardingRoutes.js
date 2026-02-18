import express from "express";
import {
  activateSchoolAfterPayment
} from "../controllers/schoolOnboardingController.js";

import { protect } from "../middlewares/auth.js";
import superAdminOnly from "../middlewares/superAdminOnly.js";

const router = express.Router();

// 🔒 Activate school after payment (SUPER ADMIN ONLY)
router.post(
  "/activate",
  protect,
  superAdminOnly,
  activateSchoolAfterPayment
);

export default router;
