const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// Fetch accepted reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'accepted' });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Submit a review
router.post("/", async (req, res) => {
  try {
    const review = new Review({
      text: req.body.text,
      author: req.body.author,
    });
    await review.save();
    res.status(201).json({ message: 'Review submitted' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting review' });
  }
});

module.exports = router;
