import Student from "../models/Student.js";
import StudentFee from "../models/StudentFee.js";
import Standard from "../models/Standard.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

/* ➕ Add Student + Create Student Login */
export const createStudent = async (req, res) => {
  try {
    const {
      rollNo,
      name,
      gender,
      dob,
      parentName,
      parentPhone,
      standardId,
      classId,
      discountAmount = 0
    } = req.body;

    if (!rollNo || !name || !dob || !standardId || !classId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const standard = await Standard.findOne({
      _id: standardId,
      schoolId: req.user.schoolId
    });

    if (!standard) {
      return res.status(404).json({ message: "Standard not found" });
    }

    const baseAmount = standard.baseFee;
    const totalPayable = baseAmount - Number(discountAmount);

    if (totalPayable < 0) {
      return res.status(400).json({ message: "Invalid discount amount" });
    }

    /* ===== CREATE STUDENT ===== */
    const student = await Student.create({
      rollNo: Number(rollNo),
      name,
      gender,
      dob: new Date(dob),
      parentName,
      parentPhone,
      standardId,
      classId,
      schoolId: req.user.schoolId
    });

    /* ===== CREATE STUDENT FEE ===== */
    await StudentFee.create({
      studentId: student._id,
      standardId,
      baseAmount,
      discountAmount: Number(discountAmount),
      totalPayable,
      totalPaid: 0,
      status: "UNPAID",
      schoolId: req.user.schoolId
    });

    /* ===== CREATE STUDENT LOGIN ===== */
    const rawPassword = `stu@${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const username = `STU-${req.user.schoolId
      .toString()
      .slice(-4)}-${rollNo}`;

    const studentUser = await User.create({
      schoolId: req.user.schoolId,
      name,
      email: `${username}@student.local`,
      password: hashedPassword,
      role: "STUDENT"
    });

    // Link user to student
    student.userId = studentUser._id;
    await student.save();

    res.status(201).json({
      student,
      studentLogin: {
        username,
        password: rawPassword
      }
    });
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error);
    res.status(500).json({ message: "Failed to add student" });
  }
};

/* 📋 Get Students by Class */
export const getStudentsByClass = async (req, res) => {
  try {
    const students = await Student.find({
      classId: req.params.classId,
      schoolId: req.user.schoolId
    })
      .sort({ rollNo: 1 })
      .select("-documents"); // hide sensitive docs

    res.json(students);
  } catch (error) {
    console.error("GET STUDENTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

/* ❌ Delete Student */
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      schoolId: req.user.schoolId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await StudentFee.deleteMany({
      studentId: student._id,
      schoolId: req.user.schoolId
    });

    await User.deleteOne({
      _id: student.userId
    });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("DELETE STUDENT ERROR:", error);
    res.status(500).json({ message: "Failed to delete student" });
  }
};