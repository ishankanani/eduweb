import School from "../models/School.js";

export const createSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: "School creation failed" });
  }
};
