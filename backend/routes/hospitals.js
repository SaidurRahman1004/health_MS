const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');

// Get all hospitals
router.get('/', async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
});

module.exports = router;