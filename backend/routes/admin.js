const express = require("express");
const Review = require("../models/Review");
const jwt = require("jsonwebtoken");
const Admin = require("../models/User");

const router = express.Router();

// Middleware for admin authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user.role !== 'admin') return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin review management
router.get("/reviews", authenticateToken, async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

router.post("/accept/:id", authenticateToken, async (req, res) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, { status: 'accepted' });
    res.status(200).json({ message: 'Review accepted' });
  } catch (error) {
    res.status(500).json({ error: 'Error accepting review' });
  }
});

router.post("/reject/:id", authenticateToken, async (req, res) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.status(200).json({ message: 'Review rejected' });
  } catch (error) {
    res.status(500).json({ error: 'Error rejecting review' });
  }
});

module.exports = router;
