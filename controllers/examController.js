import Exam from "../models/Exam.js";

export const createExam = async (req, res) => {
  try {
    const exam = await Exam.create({
      ...req.body,
      schoolId: req.user.schoolId
    });
    res.json(exam);
  } catch {
    res.status(500).json({ message: "Failed to create exam" });
  }
};
