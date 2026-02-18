import Plan from "../models/Plan.js";

/**
 * Create new membership plan
 * Only Super Admin will use this
 */
export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Failed to create plan" });
  }
};

/**
 * Get all plans (admin view)
 */
export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

/**
 * Update plan (price, status, duration)
 */
export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Failed to update plan" });
  }
};
