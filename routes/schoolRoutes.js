import express from "express";
import { createSchool } from "../controllers/schoolController.js";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";

const router = express.Router();

// Super Admin only
router.post("/", protect, createSchool);

// Example protected route
router.get("/profile", protect, subscriptionCheck, (req, res) => {
  res.json({ message: "School profile access allowed" });
});

export default router;
