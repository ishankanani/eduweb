import Student from "../models/Student.js";

/* 👤 Get Logged-in Student Profile */
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user.userId,
      schoolId: req.user.schoolId
    })
      .populate("standardId", "name")
      .populate("classId", "name");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.json({
      id: student._id,
      name: student.name,
      rollNo: student.rollNo,
      gender: student.gender,
      dob: student.dob,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      standard: student.standardId,
      class: student.classId,
      photo: student.photo,
      idCard: student.idCard
    });
  } catch (error) {
    console.error("STUDENT PROFILE ERROR:", error);
    res.status(500).json({ message: "Failed to load student profile" });
  }
};
