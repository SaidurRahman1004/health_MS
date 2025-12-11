const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
});

// Get single article
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'আর্টিকেল পাওয়া যায়নি' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
});

module.exports = router;