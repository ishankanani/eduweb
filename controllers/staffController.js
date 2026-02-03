import User from "../models/User.js";
import Staff from "../models/Staff.js";
import bcrypt from "bcrypt";

/* ➕ Create Staff */
export const createStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      role,
      designation,
      qualifications,
      salary,
      subjects,
      standards,
      bankDetails
    } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const password = "staff@123";
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      schoolId: req.user.schoolId
    });

    const staff = await Staff.create({
      userId: user._id,
      schoolId: req.user.schoolId,
      designation,
      qualifications,
      salary,
      subjects,
      standards,
      bankDetails
    });

    res.status(201).json({
      staff,
      login: {
        email,
        password
      }
    });
  } catch (error) {
    console.error("CREATE STAFF ERROR:", error);
    res.status(500).json({ message: "Failed to create staff" });
  }
};

/* 📋 Get all staff */
export const getStaff = async (req, res) => {
  const staff = await Staff.find({
    schoolId: req.user.schoolId
  })
    .populate("userId", "name email role")
    .populate("subjects", "name")
    .populate("standards", "name");

  res.json(staff);
};
