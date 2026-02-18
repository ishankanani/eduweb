import Razorpay from "razorpay";
import crypto from "crypto";
import Plan from "../models/Plan.js";
import Payment from "../models/Payment.js";

/**
 * Create Razorpay Order
 */
export const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const { planId, schoolId } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const gstAmount = (plan.price * plan.gstPercentage) / 100;
    const totalAmount = plan.price + gstAmount;

    const order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    const payment = await Payment.create({
      schoolId,
      planId,
      amount: plan.price,
      gstAmount,
      totalAmount,
      razorpayOrderId: order.id
    });

    res.json({
      orderId: order.id,
      amount: totalAmount,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
      paymentId: payment._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

/**
 * Verify Payment
 */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentId
    } = req.body;

    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        razorpayPaymentId,
        razorpaySignature,
        status: "SUCCESS"
      },
      { new: true }
    );

    res.json({ message: "Payment verified successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed" });
  }
};
