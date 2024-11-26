const express = require("express");
const Review = require('../models/Review'); // Sesuaikan dengan path model Review Anda
const { isAuthenticated } = require("../middleware/auth");
const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/", isAuthenticated, createReview);
router.get("/", getAllReviews);
// Update review
router.put("/:id", isAuthenticated, (req, res) => {
    const reviewId = req.params.id;
    const { content, rating } = req.body;
  
    // Temukan dan update review
    Review.findByIdAndUpdate(reviewId, { content, rating }, { new: true })
      .populate("user")  // Pastikan user di-populate
      .then(updatedReview => {
        if (!updatedReview) {
          return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ review: updatedReview });
      })
      .catch(err => {
        console.error("Error updating review:", err);
        res.status(500).json({ message: "Error updating review" });
      });
  });
  

router.delete("/:id", isAuthenticated, (req, res) => {
    const reviewId = req.params.id;
    console.log("Received review ID to delete:", reviewId);  // Debug log ID yang diterima

    if (!reviewId) {
        return res.status(400).json({ message: "Invalid review ID" });
    }

    Review.findByIdAndDelete(reviewId)
        .then((deletedReview) => {
            if (!deletedReview) {
                return res.status(404).json({ message: "Review not found" });
            }
            res.status(200).json({ message: "Review deleted successfully" });
        })
        .catch((err) => {
            console.error("Error deleting review:", err);
            res.status(500).json({ message: "Error deleting review" });
        });
});


module.exports = router;
