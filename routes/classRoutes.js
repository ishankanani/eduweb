import express from "express";
import {
  createClass,
  getClassesByStandard,
  deleteClass
} from "../controllers/classController.js";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";

const router = express.Router();

router.post("/", protect, subscriptionCheck, createClass);
router.get("/:standardId", protect, subscriptionCheck, getClassesByStandard);
router.delete("/:id", protect, subscriptionCheck, deleteClass);

export default router;
