import School from "../models/School.js";
import Plan from "../models/Plan.js";
import Payment from "../models/Payment.js";

/**
 * Renew subscription after successful payment
 */
export const renewSubscription = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment || payment.status !== "SUCCESS") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    const school = await School.findById(payment.schoolId);
    const plan = await Plan.findById(payment.planId);

    if (!school || !plan) {
      return res.status(404).json({ message: "School or plan not found" });
    }

    const today = new Date();
    let newExpiry;

    // If expired → start from today
    if (!school.subscriptionExpiry || today > school.subscriptionExpiry) {
      newExpiry = today;
    } else {
      // If active → extend from current expiry
      newExpiry = new Date(school.subscriptionExpiry);
    }

    newExpiry.setDate(newExpiry.getDate() + plan.durationInDays);

    // Update school
    school.subscriptionExpiry = newExpiry;
    school.planId = plan._id;
    school.isActive = true;
    await school.save();

    // Mark payment as renewal
    payment.paymentType = "RENEWAL";
    await payment.save();

    res.json({
      message: "Subscription renewed successfully",
      newExpiryDate: newExpiry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Renewal failed" });
  }
};
