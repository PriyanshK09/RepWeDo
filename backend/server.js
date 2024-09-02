const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs"); // Ensure bcrypt is required here
const cors = require('cors');
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
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
