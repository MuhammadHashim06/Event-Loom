import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Create the user
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if the passwords match
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        res.json({ message: "Login successful", userId: user._id, name: user.name });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
