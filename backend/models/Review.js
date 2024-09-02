const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  accepted: { type: Boolean, default: false } // Default to false
});

module.exports = mongoose.model('Review', reviewSchema);
