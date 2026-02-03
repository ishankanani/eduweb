import Student from "../models/Student.js";

/* 🖼 Upload Student Photo (School Admin) */
export const uploadStudentPhoto = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Photo file required" });
    }

    const student = await Student.findOne({
      _id: studentId,
      schoolId: req.user.schoolId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.photo = `/uploads/documents/${req.file.filename}`;
    await student.save();

    res.json({ message: "Student photo uploaded successfully" });
  } catch (error) {
    console.error("UPLOAD PHOTO ERROR:", error);
    res.status(500).json({ message: "Photo upload failed" });
  }
};

/* 🪪 Upload Student ID Card (School Admin) */
export const uploadStudentIdCard = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "ID card file required" });
    }

    const student = await Student.findOne({
      _id: studentId,
      schoolId: req.user.schoolId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.idCard = `/uploads/documents/${req.file.filename}`;
    await student.save();

    res.json({ message: "Student ID card uploaded successfully" });
  } catch (error) {
    console.error("UPLOAD ID CARD ERROR:", error);
    res.status(500).json({ message: "ID card upload failed" });
  }
};
