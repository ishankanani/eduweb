import School from "../models/School.js";
import Payment from "../models/Payment.js";

/**
 * Super Admin Dashboard Stats
 */
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    // Schools
    const totalSchools = await School.countDocuments();
    const activeSchools = await School.countDocuments({ isActive: true });
    const expiredSchools = await School.countDocuments({
      subscriptionExpiry: { $lt: new Date() }
    });

    // Revenue
    const totalRevenueAgg = await Payment.aggregate([
      { $match: { status: "SUCCESS" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const todayRevenueAgg = await Payment.aggregate([
      {
        $match: {
          status: "SUCCESS",
          createdAt: { $gte: today }
        }
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const monthRevenueAgg = await Payment.aggregate([
      {
        $match: {
          status: "SUCCESS",
          createdAt: { $gte: monthStart }
        }
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      schools: {
        total: totalSchools,
        active: activeSchools,
        expired: expiredSchools
      },
      revenue: {
        total: totalRevenueAgg[0]?.total || 0,
        today: todayRevenueAgg[0]?.total || 0,
        thisMonth: monthRevenueAgg[0]?.total || 0
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard stats failed" });
  }
};

/**
 * List schools with expiry info
 */
export const getSchoolsWithExpiry = async (req, res) => {
  try {
    const schools = await School.find()
      .select("name email isActive subscriptionExpiry")
      .sort({ subscriptionExpiry: 1 });

    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schools" });
  }
};

/**
 * List all payments
 */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("schoolId", "name email")
      .populate("planId", "name")
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};
