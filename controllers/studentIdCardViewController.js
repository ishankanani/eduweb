import Student from "../models/Student.js";

/* 👁 View logged-in student ID card */
export const getMyIdCard = async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user.userId,
      schoolId: req.user.schoolId
    });

    if (!student || !student.idCard) {
      return res.status(404).json({ message: "ID card not available" });
    }

    res.json({
      name: student.name,
      rollNo: student.rollNo,
      idCard: student.idCard,
      photo: student.photo
    });
  } catch (error) {
    console.error("VIEW ID CARD ERROR:", error);
    res.status(500).json({ message: "Failed to load ID card" });
  }
};
