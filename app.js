import express from "express";
import cors from "cors";
import path from "path";

/* ================= ROUTES ================= */
import authRoutes from "./routes/authRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import schoolOnboardingRoutes from "./routes/schoolOnboardingRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import superAdminDashboardRoutes from "./routes/superAdminDashboardRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import standardRoutes from "./routes/standardRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import standardFeeRoutes from "./routes/standardFeeRoutes.js";
import feePopupRoutes from "./routes/feePopupRoutes.js";
import academicRoutes from "./routes/academicRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import studentLibraryRoutes from "./routes/studentLibraryRoutes.js";
import liveClassRoutes from "./routes/liveClassRoutes.js";

const app = express();

/* ================= MIDDLEWARE ================= */
import express from "express";
import cors from "cors";
import path from "path";

/* ================= ROUTES ================= */
import authRoutes from "./routes/authRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import schoolOnboardingRoutes from "./routes/schoolOnboardingRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import superAdminDashboardRoutes from "./routes/superAdminDashboardRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import standardRoutes from "./routes/standardRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import feeRoutes from "./routes/feeRoutes.js";
import standardFeeRoutes from "./routes/standardFeeRoutes.js";
import feePopupRoutes from "./routes/feePopupRoutes.js";
import academicRoutes from "./routes/academicRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import studentLibraryRoutes from "./routes/studentLibraryRoutes.js";
import liveClassRoutes from "./routes/liveClassRoutes.js";

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: [
      "https://sharpvisions.in",
      "https://app.sharpvisions.in"
    ],
    credentials: true
  })
);


app.use(express.json());

/* ================= API ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/onboarding", schoolOnboardingRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/superadmin", superAdminDashboardRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/standards", standardRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/standard-fees", standardFeeRoutes);
app.use("/api/fee-popup", feePopupRoutes);
app.use("/api/academics", academicRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/student/library", studentLibraryRoutes);
app.use("/api/live-classes", liveClassRoutes);

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({ message: "School ERP API Running 🚀" });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});

export default app;


app.use(express.json());

/* ================= API ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/onboarding", schoolOnboardingRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/superadmin", superAdminDashboardRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/standards", standardRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/standard-fees", standardFeeRoutes);
app.use("/api/fee-popup", feePopupRoutes);
app.use("/api/academics", academicRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/student/library", studentLibraryRoutes);
app.use("/api/live-classes", liveClassRoutes);

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({ message: "School ERP API Running 🚀" });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});

export default app;
