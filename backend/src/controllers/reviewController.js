import Review from "../models/reviewModel.js";

// Yorumları gətir
export const getReviews = async (req, res) => {
  const { tourId } = req.query;
  const filter = tourId ? { tour: tourId } : {};

  try {
    const reviews = await Review.find(filter)
      .sort({ createdAt: -1 })
      .populate("user", "name image");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Yorumlar alınmadı." });
  }
};

// Yeni yorum əlavə et
export const createReview = async (req, res) => {
  const { tour, user, comment, rating } = req.body;

  if (!tour || !user || !comment || !rating) {
    return res.status(400).json({ error: "Bütün sahələr doldurulmalıdır." });
  }

  try {
    const newReview = await Review.create({ tour, user, comment, rating });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Yorum əlavə edilə bilmədi." });
  }
};

// PUT /api/reviews/:id
export const updateReview = async (req, res) => {
  const { comment, rating } = req.body;

  try {
    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      { comment, rating },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Yorum yenilənmədi." });
  }
};

// DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Yorum silindi." });
  } catch (err) {
    res.status(500).json({ error: "Yorum silinmədi." });
  }
};

export const replyToReview = async (req, res) => {
  const { comment } = req.body;
  let review = await Review.findById(req.params.id);

  if (!review) return res.status(404).json({ message: "Review not found" });

  review.replies.push({ user: req.user._id, comment });
  await review.save();

  // Yenidən tapıb populate elə
  review = await Review.findById(req.params.id).populate("replies.user", "name image");
  res.status(201).json(review);
};

