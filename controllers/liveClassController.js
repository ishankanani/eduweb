import LiveClass from "../models/LiveClass.js";

/* =====================================
   CREATE LIVE CLASS (Admin / Teacher)
===================================== */
export const createLiveClass = async (req, res) => {
  try {
    const {
      standardId,
      divisionId,
      subjectId,
      teacherId,
      title,
      description,
      liveLink,
      startDateTime,
      durationMinutes
    } = req.body;

    // ✅ Validation
    if (
      !standardId ||
      !divisionId ||
      !subjectId ||
      !teacherId ||
      !title ||
      !liveLink ||
      !startDateTime ||
      !durationMinutes
    ) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    const liveClass = await LiveClass.create({
      schoolId: req.schoolId, // from protect middleware
      teacherId,
      standardId,
      divisionId,
      subjectId,
      title,
      description,
      liveLink,
      startDateTime,
      durationMinutes,
      isActive: true
    });

    res.status(201).json(liveClass);

  } catch (error) {
    console.log("CREATE LIVE CLASS ERROR:", error);
    res.status(500).json({
      message: error.message || "Server Error"
    });
  }
};

/* =====================================
   GET LIVE CLASSES (ADMIN PANEL)
===================================== */
export const getSchoolLiveClasses = async (req, res) => {
  try {
    const liveClasses = await LiveClass.find({
      schoolId: req.schoolId
    })
      .populate("standardId")
      .populate("divisionId")
      .populate("subjectId")
      .populate("teacherId");

    res.json(liveClasses);

  } catch (error) {
    console.log("GET SCHOOL LIVE CLASS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =====================================
   GET LIVE CLASSES (STUDENT SIDE)
===================================== */
export const getStudentLiveClasses = async (req, res) => {
  try {
    const student = req.user;

    const liveClasses = await LiveClass.find({
      schoolId: student.schoolId,
      standardId: student.standardId,
      divisionId: student.divisionId,
      isActive: true
    })
      .populate("subjectId")
      .populate("teacherId");

    res.json(liveClasses);

  } catch (error) {
    console.log("GET STUDENT LIVE CLASS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =====================================
   STOP LIVE CLASS
===================================== */
export const deactivateLiveClass = async (req, res) => {
  try {
    await LiveClass.findByIdAndUpdate(req.params.id, {
      isActive: false
    });

    res.json({ message: "Live class stopped successfully" });

  } catch (error) {
    console.log("DEACTIVATE LIVE CLASS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
