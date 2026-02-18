import StudentFee from "../models/StudentFee.js";
import StudentPayment from "../models/StudentPayment.js";

/* 📋 Get Fees (CLASS WISE) */
export const getStudentFeesByClass = async (req, res) => {
  try {
    const fees = await StudentFee.find({
      schoolId: req.user.schoolId
    })
      .populate("studentId", "name rollNo parentPhone classId")
      .populate("standardId", "name");

    // 🔒 Filter by classId (FIX)
    const filtered = fees.filter(
      (f) => f.studentId?.classId?.toString() === req.params.classId
    );

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch fees" });
  }
};

/* 💰 Add Payment */
export const addPayment = async (req, res) => {
  try {
    const { studentFeeId, amountPaid, paymentMode = "Cash", remarks = "" } = req.body;

    const fee = await StudentFee.findOne({
      _id: studentFeeId,
      schoolId: req.user.schoolId
    });

    if (!fee) {
      return res.status(404).json({ message: "Fee record not found" });
    }

    const pending = fee.totalPayable - fee.totalPaid;

    if (amountPaid <= 0 || amountPaid > pending) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    await StudentPayment.create({
      studentFeeId,
      amountPaid,
      paymentMode,
      remarks,
      schoolId: req.user.schoolId
    });

    fee.totalPaid += Number(amountPaid);
    fee.status = fee.totalPaid >= fee.totalPayable ? "PAID" : "PARTIAL";

    await fee.save();

    res.json(fee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment failed" });
  }
};
