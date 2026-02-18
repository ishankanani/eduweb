import Student from "../models/Student.js";
import Material from "../models/Material.js";
import Exam from "../models/Exam.js";
import Result from "../models/Result.js";

/* 📘 Student Materials */
export const getStudentMaterials = async (req, res) => {
  const student = await Student.findOne({
    userId: req.user.userId,
    schoolId: req.user.schoolId
  });

  const materials = await Material.find({
    standardId: student.standardId,
    classId: student.classId,
    schoolId: req.user.schoolId
  });

  res.json(materials);
};

/* 📝 Student Exams */
export const getStudentExams = async (req, res) => {
  const student = await Student.findOne({
    userId: req.user.userId,
    schoolId: req.user.schoolId
  });

  const exams = await Exam.find({
    standardId: student.standardId,
    classId: student.classId,
    schoolId: req.user.schoolId
  });

  res.json(exams);
};

/* 📊 Student Results */
export const getStudentResults = async (req, res) => {
  const student = await Student.findOne({
    userId: req.user.userId,
    schoolId: req.user.schoolId
  });

  const results = await Result.find({
    studentId: student._id,
    schoolId: req.user.schoolId
  }).populate("examId", "name");

  res.json(results);
};
