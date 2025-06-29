// src/controllers/adminReviewController.js
import Review from "../models/reviewModel.js";

export const getAllReviewsForAdmin = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate("user", "name image")
      .populate("tour", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Admin üçün yorumlar alınmadı." });
  }
};
