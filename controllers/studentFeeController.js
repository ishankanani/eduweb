import Student from "../models/Student.js";
import StudentFee from "../models/StudentFee.js";
import StudentPayment from "../models/StudentPayment.js";

/* 💰 Get Logged-in Student Fee Details */
export const getStudentFees = async (req, res) => {
  try {
    // 1️⃣ Find student using JWT (SECURE)
    const student = await Student.findOne({
      userId: req.user.userId,
      schoolId: req.user.schoolId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 2️⃣ Get student fee
    const fee = await StudentFee.findOne({
      studentId: student._id,
      schoolId: req.user.schoolId
    });

    if (!fee) {
      return res.status(404).json({ message: "Fee record not found" });
    }

    // 3️⃣ Get payment history
    const payments = await StudentPayment.find({
      studentFeeId: fee._id,
      schoolId: req.user.schoolId
    }).sort({ createdAt: -1 });

    res.json({
      totalPayable: fee.totalPayable,
      totalPaid: fee.totalPaid,
      pendingAmount: fee.totalPayable - fee.totalPaid,
      status: fee.status,
      payments
    });
  } catch (error) {
    console.error("STUDENT FEES ERROR:", error);
    res.status(500).json({ message: "Failed to load fee details" });
  }
};
