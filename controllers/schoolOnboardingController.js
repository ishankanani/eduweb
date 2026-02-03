import School from "../models/School.js";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
import Payment from "../models/Payment.js";
import bcrypt from "bcrypt";

/**
 * Activate school after successful payment
 */
export const activateSchoolAfterPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    // 1. Get payment
    const payment = await Payment.findById(paymentId);
    if (!payment || payment.status !== "SUCCESS") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    // 2. Get school & plan
    const school = await School.findById(payment.schoolId);
    const plan = await Plan.findById(payment.planId);

    if (!school || !plan) {
      return res.status(404).json({ message: "School or plan not found" });
    }

    // 3. Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + plan.durationInDays);

    // 4. Activate school
    school.planId = plan._id;
    school.subscriptionExpiry = expiryDate;
    school.isActive = true;
    await school.save();

    // 5. Auto-create School Admin
    const password = "school@123"; // temporary password
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminExists = await User.findOne({
      schoolId: school._id,
      role: "SCHOOL_ADMIN"
    });

    if (!adminExists) {
      await User.create({
        schoolId: school._id,
        name: "School Admin",
        email: school.email,
        password: hashedPassword,
        role: "SCHOOL_ADMIN"
      });
    }

    res.json({
      message: "School activated successfully",
      adminLogin: {
        email: school.email,
        password: password
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "School activation failed" });
  }
};
