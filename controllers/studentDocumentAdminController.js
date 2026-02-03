import Student from "../models/Student.js";

/* ✅ Verify student document (School Admin) */
export const verifyStudentDocument = async (req, res) => {
  try {
    const { studentId, docId, verified } = req.body;

    const student = await Student.findOne({
      _id: studentId,
      schoolId: req.user.schoolId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const document = student.documents.id(docId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    document.verified = verified;
    await student.save();

    res.json({ message: "Document status updated" });
  } catch (error) {
    console.error("VERIFY DOCUMENT ERROR:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};
