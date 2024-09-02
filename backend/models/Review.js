const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reviewText: { type: String, required: true },
  accepted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Review', reviewSchema);
