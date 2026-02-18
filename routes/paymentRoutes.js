import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import School from "../models/School.js";

const router = express.Router();

// Create Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    // 🔥 Initialize Razorpay here
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

// Verify Payment
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    await School.findByIdAndUpdate(userId, {
      isActive: true,
      subscriptionExpiry: expiryDate,
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
});

export default router;
