const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET all accepted reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ accepted: true });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new review
router.post('/', async (req, res) => {
  const { text, author } = req.body;
  const newReview = new Review({
    text,
    author,
    accepted: false // Default to false; will need admin approval
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
