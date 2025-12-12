const express = require('express');
const router = express.Router();
const {
    getAllSymptoms,
    getSymptomsByCategory,
    checkSymptoms
} = require('../controllers/symptomController');

// POST route MUST come before GET route to avoid conflicts
router.post('/check', checkSymptoms);
router.get('/category/:categoryId', getSymptomsByCategory);
router.get('/', getAllSymptoms);

module.exports = router;