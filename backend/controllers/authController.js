const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, age, gender } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'অনুগ্রহ করে সব তথ্য পূরণ করুন' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'এই ইমেইল দিয়ে ইতিমধ্যে রেজিস্ট্রেশন হয়েছে' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            gender
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                token: generateToken(user._id),
                message: '✅ রেজিস্ট্রেশন সফল হয়েছে!'
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'ইমেইল ও পাসওয়ার্ড দিন' });
        }

        // Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'ভুল ইমেইল বা পাসওয়ার্ড' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'ভুল ইমেইল বা পাসওয়ার্ড' });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            token: generateToken(user._id),
            message: '✅ লগইন সফল হয়েছে!'
        });
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};