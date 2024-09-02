const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Fetch all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Accept or reject a review
router.put('/reviews/:id', async (req, res) => {
  try {
    const { status } = req.body; // Status should be 'accepted' or 'rejected'
    const review = await Review.findByIdAndUpdate(req.params.id, { accepted: status === 'accepted' }, { new: true });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Error updating review status' });
  }
});

module.exports = router;
