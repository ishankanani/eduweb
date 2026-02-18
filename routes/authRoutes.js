import express from "express";
import { login, registerSchool } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register-school", registerSchool);

export default router;
