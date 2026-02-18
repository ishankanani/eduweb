import StandardFee from "../models/StandardFee.js";

/* ➕ Create / Update Fee for Academic Year */
export const createOrUpdateStandardFee = async (req, res) => {
  try {
    const { standardId, academicYear, amount } = req.body;

    if (!standardId || !academicYear || amount === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Deactivate old active fee
    await StandardFee.updateMany(
      {
        standardId,
        schoolId: req.user.schoolId,
        isActive: true
      },
      { isActive: false }
    );

    const fee = await StandardFee.create({
      standardId,
      academicYear,
      amount,
      isActive: true,
      createdBy: req.user.userId,
      schoolId: req.user.schoolId
    });

    res.status(201).json(fee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save standard fee" });
  }
};

/* 📋 Get Active Fee */
export const getActiveStandardFee = async (req, res) => {
  try {
    const fee = await StandardFee.findOne({
      standardId: req.params.standardId,
      schoolId: req.user.schoolId,
      isActive: true
    });

    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch active fee" });
  }
};

/* 🕘 Fee History */
export const getStandardFeeHistory = async (req, res) => {
  try {
    const history = await StandardFee.find({
      standardId: req.params.standardId,
      schoolId: req.user.schoolId
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch fee history" });
  }
};
