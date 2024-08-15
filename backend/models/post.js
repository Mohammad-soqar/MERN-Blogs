// backend/models/Post.js
const mongoose = require('mongoose');

// Define the schema for a post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },

}, { collection: 'posts' });

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
