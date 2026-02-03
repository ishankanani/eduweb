import Class from "../models/Class.js";

/* ➕ Add Class */
export const createClass = async (req, res) => {
  try {
    const { name, standardId } = req.body;

    if (!name || !standardId) {
      return res.status(400).json({ message: "Name and Standard required" });
    }

    const exists = await Class.findOne({
      name,
      standardId,
      schoolId: req.user.schoolId
    });

    if (exists) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = await Class.create({
      name,
      standardId,
      schoolId: req.user.schoolId
    });

    res.status(201).json(newClass);
  } catch {
    res.status(500).json({ message: "Failed to create class" });
  }
};

/* 📋 Get Classes by Standard */
export const getClassesByStandard = async (req, res) => {
  try {
    const classes = await Class.find({
      standardId: req.params.standardId,
      schoolId: req.user.schoolId
    }).sort({ createdAt: 1 });

    res.json(classes);
  } catch {
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};

/* ❌ Delete Class */
export const deleteClass = async (req, res) => {
  try {
    const cls = await Class.findOneAndDelete({
      _id: req.params.id,
      schoolId: req.user.schoolId
    });

    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json({ message: "Class deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete class" });
  }
};
