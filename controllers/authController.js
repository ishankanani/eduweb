import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    // ✅ IMPORTANT FIX
    res.json({
      token,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
