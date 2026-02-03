import User from "../models/User.js";
import bcrypt from "bcrypt";

/* ➕ Create Teacher (School Admin) */
export const createTeacher = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const password = "teacher@123"; // temporary
    const hashed = await bcrypt.hash(password, 10);

    const teacher = await User.create({
      name,
      email,
      password: hashed,
      role: "TEACHER",
      schoolId: req.user.schoolId
    });

    res.status(201).json({
      teacher,
      login: {
        email,
        password
      }
    });
  } catch (error) {
    console.error("CREATE TEACHER ERROR:", error);
    res.status(500).json({ message: "Failed to create teacher" });
  }
};

/* 📋 Get Teachers (School Admin) */
export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({
      role: "TEACHER",
      schoolId: req.user.schoolId
    }).select("name email");

    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teachers" });
  }
};
