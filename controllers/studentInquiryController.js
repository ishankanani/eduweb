import Inquiry from "../models/Inquiry.js";
import Student from "../models/Student.js";

/* 📨 Student raises enquiry */
export const createInquiry = async (req, res) => {
  try {
    const { subject, heading, message } = req.body;

    if (!subject || !heading || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const student = await Student.findOne({
      userId: req.user.userId,
      schoolId: req.user.schoolId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const inquiry = await Inquiry.create({
      studentId: student._id,
      schoolId: req.user.schoolId,
      subject,
      heading,
      message
    });

    res.status(201).json(inquiry);
  } catch (error) {
    console.error("CREATE INQUIRY ERROR:", error);
    res.status(500).json({ message: "Failed to create inquiry" });
  }
};

/* 📄 Student views own enquiries */
export const getMyInquiries = async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user.userId,
      schoolId: req.user.schoolId
    });

    const inquiries = await Inquiry.find({
      studentId: student._id,
      schoolId: req.user.schoolId
    }).sort({ createdAt: -1 });

    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to load inquiries" });
  }
};
