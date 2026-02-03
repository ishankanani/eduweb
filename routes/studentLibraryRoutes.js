import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";
import studentOnly from "../middlewares/studentOnly.js";

import {
  getLibraryBooksForStudent,
  getMyIssuedBooks
} from "../controllers/studentLibraryController.js";

const router = express.Router();

router.get("/books", protect, subscriptionCheck, studentOnly, getLibraryBooksForStudent);
router.get("/my-books", protect, subscriptionCheck, studentOnly, getMyIssuedBooks);

export default router;
