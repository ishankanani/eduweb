const studentOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "STUDENT") {
    return res.status(403).json({
      message: "Access denied. Student only."
    });
  }
  next();
};

export default studentOnly;
