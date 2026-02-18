import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import {
  createSubject,
  getSubjectsByStandard
} from "../controllers/subjectController.js";

const router = express.Router();

router.post("/", protect, subscriptionCheck, createSubject);
router.get("/:standardId", protect, subscriptionCheck, getSubjectsByStandard);

export default router;
