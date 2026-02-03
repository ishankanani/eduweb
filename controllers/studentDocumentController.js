import Student from "../models/Student.js";

/* 📄 Upload document (Student) */
export const uploadStudentDocument = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type || !req.file) {
      return res.status(400).json({ message: "Missing document data" });
    }

    const student = await Student.findOne({
      userId: req.user.userId,
      schoolId: req.user.schoolId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.documents.push({
      type,
      url: `/uploads/documents/${req.file.filename}`,
      verified: false
    });

    await student.save();

    res.json({ message: "Document uploaded successfully" });
  } catch (error) {
    console.error("UPLOAD DOCUMENT ERROR:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};
