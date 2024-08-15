const express = require("express")
const Post = require('../models/post')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })


let postRoutes = express.Router()

//Retrieve All
postRoutes.route("/posts").get(verifyToken, async (req, res) => {

    try {

        const posts = await Post.find()
        if (posts) {
            res.json(posts)
        } else {
            req.status(404).json({ msg: "Post Not Found" });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Retrieve one
postRoutes.route("/posts/:id").get(verifyToken, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        if (post) {
            res.json(post)
        } else {
            req.status(404).json({ msg: "Post Not Found" });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Create one
postRoutes.route("/posts").post(verifyToken, async (req, res) => {
    try {
        const { title, description, content, author } = req.body;
        console.log(author)

        const newPost = new Post({
            title,
            description,
            content,
            author,
            dateCreated: Date.now()
        })

        const post = await newPost.save()

        res.status(201).json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




//Update one
postRoutes.route("/posts/:id").put(verifyToken, async (req, res) => {
    try {
        const { title, description, content, author } = req.body;

        // Find the post by ID and update it
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, description, content, author, dateCreated: Date.now() },
            { new: true } // Returns the updated document
        );

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ msg: "Post not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Delete one
postRoutes.route("/posts/:id").delete(verifyToken, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (post) {
            res.json({ msg: "Post deleted" });
        } else {
            res.status(404).json({ msg: "Post not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

function verifyToken(req, res, next) {
    const authHeaders = req.headers["authorization"]
    const token = authHeaders && authHeaders.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: "Auth token is missing" })
    }

    jwt.verify(token, process.env.SECRETKEY, (error, user) => {
        if (error) {
            return res.status(403).json({ message: "invalid token" })
        }
        req.body.user = user
        next()
    })
}

module.exports = postRoutes
