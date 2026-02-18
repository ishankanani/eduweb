import User from "../models/User.js";
import School from "../models/School.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ================= REGISTER SCHOOL ================= */

export const registerSchool = async (req, res) => {
  try {
    const { schoolName, email, password } = req.body;

    if (!schoolName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create school
    const school = await School.create({
      name: schoolName,
      email,
      isActive: false,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ FIXED USER CREATION
    const user = await User.create({
      name: schoolName,                 // REQUIRED
      email,
      password: hashedPassword,
      role: "SCHOOL_ADMIN",             // MUST MATCH ENUM
      schoolId: school._id,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        schoolId: school._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      userId: school._id,
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ================= LOGIN ================= */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        schoolId: user.schoolId
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    let premiumActive = true;

    if (user.role === "SCHOOL_ADMIN") {
      const school = await School.findById(user.schoolId);

      if (!school || !school.isActive) {
        premiumActive = false;
      } else if (
        !school.subscriptionExpiry ||
        school.subscriptionExpiry < new Date()
      ) {
        premiumActive = false;
        school.isActive = false;
        await school.save();
      }
    }

    res.json({
      token,
      role: user.role,
      userId: user.schoolId,
      premiumActive
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
