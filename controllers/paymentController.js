import Plan from "../models/Plan.js";
import Payment from "../models/Payment.js";

/**
 * TEMP: Create Order (Dummy)
 */
export const createOrder = async (req, res) => {
  try {
    const { planId, schoolId } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const gstAmount = (plan.price * plan.gstPercentage) / 100;
    const totalAmount = plan.price + gstAmount;

    // create fake payment directly (no Razorpay)
    const payment = await Payment.create({
      schoolId,
      planId,
      amount: plan.price,
      gstAmount,
      totalAmount,
      status: "SUCCESS", // auto success
      razorpayOrderId: "TEMP_DISABLED"
    });

    res.json({
      message: "Payment module temporarily disabled",
      paymentId: payment._id,
      amount: totalAmount
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};


/**
 * TEMP: Verify Payment (always success)
 */
export const verifyPayment = async (req, res) => {
  return res.json({
    message: "Payment verification bypassed (temporary)"
  });
};
