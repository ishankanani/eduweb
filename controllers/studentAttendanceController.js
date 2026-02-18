import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";

/* 📅 Get Logged-in Student Attendance (Month-wise) */
export const getMyAttendance = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year are required"
      });
    }

    // 1️⃣ Get student using JWT
    const student = await Student.findOne({
      userId: req.user.userId,
      schoolId: req.user.schoolId
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // 2️⃣ Date range
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // 3️⃣ Fetch attendance records for student's class
    const attendanceRecords = await Attendance.find({
      classId: student.classId,
      schoolId: req.user.schoolId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    // 4️⃣ Extract only this student's attendance
    const result = attendanceRecords.map((att) => {
      const record = att.records.find(
        (r) => r.studentId.toString() === student._id.toString()
      );

      return {
        date: att.date,
        status: record ? record.status : "ABSENT"
      };
    });

    res.json({
      student: {
        name: student.name,
        rollNo: student.rollNo
      },
      attendance: result
    });
  } catch (error) {
    console.error("STUDENT ATTENDANCE ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch attendance"
    });
  }
};
