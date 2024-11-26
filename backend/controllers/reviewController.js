const Review = require("../models/Review");

// Create Review
exports.createReview = async (req, res) => {
  const { content, rating } = req.body;
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ message: "User not authenticated" });

  try {
    const review = await Review.create({ user: userId, content, rating });
    res.status(201).json({ message: "Review created successfully", review });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Error creating review" });
  }
};

// Read All Reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "username").sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// Update Review
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { content, rating } = req.body;
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ message: "User not authenticated" });

  try {
    const review = await Review.findOneAndUpdate(
      { _id: id, user: userId },
      { content, rating },
      { new: true }
    );

    if (!review) return res.status(404).json({ message: "Review not found or unauthorized" });

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ message: "Error updating review" });
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  if (!userId) return res.status(401).json({ message: "User not authenticated" });

  try {
    const review = await Review.findOneAndDelete({ _id: id, user: userId });

    if (!review) return res.status(404).json({ message: "Review not found or unauthorized" });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ message: "Error deleting review" });
  }
};
