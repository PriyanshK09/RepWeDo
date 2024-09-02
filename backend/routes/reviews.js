const express = require('express');
const Review = require('../models/Review');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ accepted: true });
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { name, reviewText } = req.body;
  try {
    const newReview = new Review({ name, reviewText });
    await newReview.save();
    res.status(201).json({ message: 'Review submitted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
