import express from "express";
import { renewSubscription } from "../controllers/subscriptionController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Renew subscription
router.post("/renew", protect, renewSubscription);

export default router;
