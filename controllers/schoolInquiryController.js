import Inquiry from "../models/Inquiry.js";

/* 🏫 School: get all enquiries */
export const getSchoolInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({
      schoolId: req.user.schoolId
    })
      .populate("studentId", "name rollNo")
      .sort({ createdAt: -1 });

    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};

/* ✏️ Update status & remark */
export const updateInquiryStatus = async (req, res) => {
  try {
    const { inquiryId, status, schoolRemark } = req.body;

    const inquiry = await Inquiry.findOneAndUpdate(
      {
        _id: inquiryId,
        schoolId: req.user.schoolId
      },
      {
        status,
        schoolRemark
      },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to update inquiry" });
  }
};
