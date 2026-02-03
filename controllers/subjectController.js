import Subject from "../models/Subject.js";

/* ➕ Create Subject (Standard-wise) */
export const createSubject = async (req, res) => {
  try {
    const { name, standardId } = req.body;

    if (!name || !standardId) {
      return res.status(400).json({ message: "Name & standard required" });
    }

    const exists = await Subject.findOne({
      name,
      standardId,
      schoolId: req.user.schoolId
    });

    if (exists) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    const subject = await Subject.create({
      name,
      standardId,
      schoolId: req.user.schoolId
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: "Failed to create subject" });
  }
};

/* 📋 Get subjects by standard */
export const getSubjectsByStandard = async (req, res) => {
  const subjects = await Subject.find({
    standardId: req.params.standardId,
    schoolId: req.user.schoolId
  }).sort({ name: 1 });

  res.json(subjects);
};
