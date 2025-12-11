const express = require('express');
const router = express.Router();
const CheckupHistory = require('../models/CheckupHistory');
const { protect } = require('../middleware/auth');

// Get user's checkup history
router.get('/', protect, async (req, res) => {
    try {
        const history = await CheckupHistory.find({ user_id: req.user._id })
            .sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
});

module.exports = router;