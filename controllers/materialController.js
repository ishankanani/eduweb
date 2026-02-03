import Material from "../models/Material.js";

export const uploadMaterial = async (req, res) => {
  try {
    const { title, description, standardId, classId } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "File is required"
      });
    }

    const material = await Material.create({
      title,
      description,
      fileUrl: `/uploads/documents/${req.file.filename}`,
      standardId,
      classId,
      schoolId: req.user.schoolId
    });

    res.json(material);
  } catch (error) {
    res.status(500).json({ message: "Failed to upload material" });
  }
};
