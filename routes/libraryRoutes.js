import express from "express";
import { protect } from "../middlewares/auth.js";
import subscriptionCheck from "../middlewares/SubscriptionCheck.js";

import {
  addBook,
  getBooks,
  issueBook,
  returnBook
} from "../controllers/libraryController.js";

const router = express.Router();

router.post("/books", protect, subscriptionCheck, addBook);
router.get("/books", protect, subscriptionCheck, getBooks);
router.post("/issue", protect, subscriptionCheck, issueBook);
router.post("/return", protect, subscriptionCheck, returnBook);

export default router;
