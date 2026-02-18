import School from "../models/School.js";

const subscriptionCheck = async (req, res, next) => {
  try {
    // SUPER ADMIN is never blocked
    if (req.user?.role === "SUPER_ADMIN") {
      return next();
    }

    // If no school context, skip
    if (!req.user?.schoolId) {
      return next();
    }

    const school = await School.findById(req.user.schoolId);

    if (!school) {
      return res.status(403).json({
        message: "School not found"
      });
    }

    const today = new Date();

    // Expired or inactive
    if (
      !school.isActive ||
      !school.subscriptionExpiry ||
      today > school.subscriptionExpiry
    ) {
      return res.status(402).json({
        message: "Subscription expired",
        code: "SUBSCRIPTION_EXPIRED"
      });
    }

    next();
  } catch (error) {
    console.error("SUBSCRIPTION CHECK ERROR:", error);
    res.status(500).json({
      message: "Subscription check failed"
    });
  }
};

export default subscriptionCheck;
