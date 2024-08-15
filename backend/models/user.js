// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts' // Reference to the Post model
  }],
  // Add more fields as needed
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

const User = mongoose.model('User', userSchema);

module.exports = User;
