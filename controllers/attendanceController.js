import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

/* 📝 TAKE ATTENDANCE (School Admin / Teacher only) */
export const takeAttendance = async (req, res) => {
  try {
    // 🔐 ROLE CHECK
    if (!["TEACHER", "SCHOOL_ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed to take attendance" });
    }

    const {
      date,
      standardId,
      classId,
      presentStudentIds = []
    } = req.body;

    if (!date || !standardId || !classId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Normalize date (00:00)
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // Fetch students of that class + standard (DATA SAFETY)
    const students = await Student.find({
      classId,
      standardId,
      schoolId: req.user.schoolId
    }).select("_id");

    if (!students.length) {
      return res.status(404).json({ message: "No students found for class" });
    }

    // Build attendance records
    const records = students.map((s) => ({
      studentId: s._id,
      status: presentStudentIds.includes(s._id.toString())
        ? "PRESENT"
        : "ABSENT"
    }));

    const attendance = await Attendance.create({
      date: attendanceDate,
      standardId,
      classId,
      teacherId: req.user.userId, // 🔒 TRUST TOKEN, NOT BODY
      schoolId: req.user.schoolId,
      records
    });

    res.status(201).json(attendance);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Attendance already taken for this class on this date"
      });
    }

    console.error("TAKE ATTENDANCE ERROR:", error);
    res.status(500).json({ message: "Failed to take attendance" });
  }
};

/* 📖 MONTH-WISE ATTENDANCE REGISTER (Admin / Teacher) */
export const getClassAttendanceByMonth = async (req, res) => {
  try {
    const { classId } = req.params;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year required" });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const attendance = await Attendance.find({
      classId,
      schoolId: req.user.schoolId,
      date: { $gte: startDate, $lte: endDate }
    })
      .populate("records.studentId", "rollNo name")
      .populate("teacherId", "name")
      .sort({ date: 1 });

    res.json(attendance);
  } catch (error) {
    console.error("FETCH ATTENDANCE ERROR:", error);
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};

/* ✏️ UPDATE ATTENDANCE (Admin / Teacher only) */
export const updateAttendance = async (req, res) => {
  try {
    // 🔐 ROLE CHECK
    if (!["TEACHER", "SCHOOL_ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not allowed to edit attendance" });
    }

    const { attendanceId, records } = req.body;

    if (!attendanceId || !Array.isArray(records)) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const attendance = await Attendance.findOne({
      _id: attendanceId,
      schoolId: req.user.schoolId
    });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    // 🔒 LOCK OLD ATTENDANCE (7 DAYS)
    const diffDays =
      (Date.now() - new Date(attendance.date)) / (1000 * 60 * 60 * 24);

    if (diffDays > 7) {
      return res.status(403).json({
        message: "Attendance editing locked after 7 days"
      });
    }

    attendance.records = records;
    await attendance.save();

    res.json(attendance);
  } catch (error) {
    console.error("UPDATE ATTENDANCE ERROR:", error);
    res.status(500).json({ message: "Failed to update attendance" });
  }
};
