import Standard from "../models/Standard.js";

/* ➕ Create Standard */
export const createStandard = async (req, res) => {
  try {
    const { name, baseFee } = req.body;

    if (!name || baseFee === undefined) {
      return res.status(400).json({
        message: "Standard name and fee are required"
      });
    }

    const exists = await Standard.findOne({
      name,
      schoolId: req.user.schoolId
    });

    if (exists) {
      return res.status(400).json({ message: "Standard already exists" });
    }

    const standard = await Standard.create({
      name,
      baseFee: Number(baseFee),
      schoolId: req.user.schoolId
    });

    res.status(201).json(standard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create standard" });
  }
};

/* 📋 Get Standards */
export const getStandards = async (req, res) => {
  try {
    const standards = await Standard.find({
      schoolId: req.user.schoolId
    }).sort({ createdAt: 1 });

    res.json(standards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch standards" });
  }
};

/* ❌ Delete Standard */
export const deleteStandard = async (req, res) => {
  try {
    const standard = await Standard.findOneAndDelete({
      _id: req.params.id,
      schoolId: req.user.schoolId
    });

    if (!standard) {
      return res.status(404).json({ message: "Standard not found" });
    }

    res.json({ message: "Standard deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete standard" });
  }
};
