const express = require('express');
const router = express.Router();
const {
    getAllSymptoms,
    getSymptomsByCategory,
    checkSymptoms
} = require('../controllers/symptomController');

router.get('/', getAllSymptoms);
router.get('/category/:categoryId', getSymptomsByCategory);
router.post('/check', checkSymptoms);

module.exports = router;