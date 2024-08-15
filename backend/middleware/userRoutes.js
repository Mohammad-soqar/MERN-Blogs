const express = require("express")
const User = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config({ path: './config.env' })
let userRoutes = express.Router()


const SALT_ROUNDS = 11
// Retrieve All Users
userRoutes.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ msg: "No users found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Retrieve One User
userRoutes.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Create One User
userRoutes.post("/users", async (req, res) => {
    try {
        const { name, email, password, posts } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please include all fields" });
        }

        // Check for duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS)
        const newUser = new User({
            name,
            email,
            password: hash,
            posts: posts || [], // Ensure posts is an array, default to empty array if not provided
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update One User
userRoutes.put("/users/:id", async (req, res) => {
    try {
        const { name, email, password, posts } = req.body; // Update as needed

        // Find the user by ID and update it
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password, posts }, // Ensure these fields are the ones you want to update
            { new: true, runValidators: true } // Returns the updated document and applies validators
        );

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete One User
userRoutes.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ msg: "User deleted" });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login User
userRoutes.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ msg: "Please include all fields" });
        }

        const userAccount = await User.findOne({ email });

        if (userAccount) {
            let confirmation = await bcrypt.compare(password, userAccount.password);

            if (confirmation) {
                // Create a payload with only the necessary information
                const payload = {
                    id: userAccount._id,
                    name: userAccount.name,
                    email: userAccount.email,
                };

                // Sign the JWT with the payload
                const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });
                res.json({ success: true, token });
            } else {
                res.json({ success: false, message: "Incorrect Password" });
            }
        } else {
            res.json({ success: false, message: "User Not Found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = userRoutes;
