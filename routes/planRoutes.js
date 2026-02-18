import express from "express";
import {
  createPlan,
  getAllPlans,
  updatePlan
} from "../controllers/planController.js";

const router = express.Router();

// Create new plan
router.post("/", createPlan);

// Get all plans
router.get("/", getAllPlans);

// Update plan
router.put("/:id", updatePlan);

export default router;
