import Result from "../models/Result.js";

export const addResult = async (req, res) => {
  try {
    const result = await Result.create({
      ...req.body,
      schoolId: req.user.schoolId
    });
    res.json(result);
  } catch {
    res.status(500).json({ message: "Failed to add result" });
  }
};
