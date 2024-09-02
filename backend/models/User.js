const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['normal', 'premium', 'admin'], default: 'normal' }
});

userSchema.pre('save', async function (next) {
  next();
});

module.exports = mongoose.model('User', userSchema);