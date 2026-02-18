import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import {
  createStandard,
  getStandards,
  deleteStandard
} from "../controllers/standardController.js";

const router = express.Router();

/* ➕ Create Standard (with base fee) */
router.post("/", protect, subscriptionCheck, createStandard);

/* 📋 Get all standards */
router.get("/", protect, subscriptionCheck, getStandards);

/* ❌ Delete standard */
router.delete("/:id", protect, subscriptionCheck, deleteStandard);

export default router;
