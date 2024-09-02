const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the URL of your frontend application
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  text: String,
  author: String,
  status: { type: String, default: 'pending' },
});
const Review = mongoose.model('Review', reviewSchema);

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['normal', 'premium', 'admin'], default: 'normal' },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

app.use(bodyParser.json());

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Fetch reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'accepted' });
    res.json(reviews);
  } catch (error) {
    res.status(500).send('Error fetching reviews');
  }
});

// Submit a review
app.post('/api/reviews', async (req, res) => {
  try {
    const review = new Review({
      text: req.body.text,
      author: req.body.author,
    });
    await review.save();
    res.status(201).send('Review submitted');
  } catch (error) {
    res.status(500).send('Error submitting review');
  }
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Received login request for:", username);

    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(401).send('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Login successful, token generated");
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send('Server error');
  }
});

// Admin login
app.use('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin
      .findOne({ email })
      .select('+password');
      
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
app.get('/api/admin/reviews', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).send('Error fetching reviews');
  }
});

app.post('/api/admin/accept/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    await Review.findByIdAndUpdate(req.params.id, { status: 'accepted' });
    res.status(200).send('Review accepted');
  } catch (error) {
    res.status(500).send('Error accepting review');
  }
});

app.post('/api/admin/reject/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    await Review.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.status(200).send('Review rejected');
  } catch (error) {
    res.status(500).send('Error rejecting review');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
