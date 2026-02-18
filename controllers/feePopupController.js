import Student from "../models/Student.js";
import StudentFee from "../models/StudentFee.js";

/* 📦 Fee Popup Data */
export const getStudentFeePopupData = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({
      _id: studentId,
      schoolId: req.user.schoolId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const fees = await StudentFee.find({
      studentId,
      schoolId: req.user.schoolId
    }).sort({ createdAt: 1 });

    const totalPending = fees.reduce(
      (sum, f) => sum + (f.totalPayable - f.totalPaid),
      0
    );

    res.json({
      student,
      feeDetails: fees,
      totalPending
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load fee popup data" });
  }
};
