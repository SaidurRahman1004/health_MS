const express = require('express');
const router = express.Router();
const FirstAid = require('../models/FirstAid');

// Get all first aid tips
router.get('/', async (req, res) => {
    try {
        const firstAid = await FirstAid.find();
        res.json(firstAid);
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
});

module.exports = router;