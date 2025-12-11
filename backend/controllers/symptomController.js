const Symptom = require('../models/Symptom');
const Category = require('../models/Category');
const Mapping = require('../models/Mapping');
const Doctor = require('../models/Doctor');
const CheckupHistory = require('../models/CheckupHistory');

// @desc    Get all symptoms
// @route   GET /api/symptoms
// @access  Public
const getAllSymptoms = async (req, res) => {
    try {
        const symptoms = await Symptom.find();
        res.json(symptoms);
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
};

// @desc    Get symptoms by category
// @route   GET /api/symptoms/category/:categoryId
// @access  Public
const getSymptomsByCategory = async (req, res) => {
    try {
        const symptoms = await Symptom.find({ category_id: req.params.categoryId });
        res.json(symptoms);
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
};

// @desc    Check symptoms and get diagnosis
// @route   POST /api/symptoms/check
// @access  Public
const checkSymptoms = async (req, res) => {
    try {
        const { symptom_ids, user_id } = req.body;

        if (!symptom_ids || symptom_ids.length === 0) {
            return res.status(400).json({ message: 'অন্তত একটি লক্ষণ নির্বাচন করুন' });
        }

        // Get mappings for selected symptoms
        const mappings = await Mapping.find({ symptom_id: { $in: symptom_ids } });

        if (mappings.length === 0) {
            return res.status(404).json({ message: 'কোনো ম্যাচিং তথ্য পাওয়া যায়নি' });
        }

        // Get symptoms details
        const symptoms = await Symptom.find({ symptom_id: { $in: symptom_ids } });

        // Get categories
        const categoryIds = [... new Set(mappings.map(m => m.category_id))];
        const categories = await Category.find({ category_id: { $in: categoryIds } });

        // Get doctors
        const doctors = await Doctor.find({ category_id: { $in: categoryIds } });

        // Calculate risk level
        const riskCounts = { High: 0, Medium: 0, Low: 0 };
        mappings.forEach(m => {
            if (m.risk_level) riskCounts[m.risk_level]++;
        });

        let overallRisk = 'Low';
        if (riskCounts.High > 0) overallRisk = 'High';
        else if (riskCounts.Medium > 0) overallRisk = 'Medium';

        // Prepare results
        const results = mappings.map(mapping => {
            const symptom = symptoms.find(s => s.symptom_id === mapping.symptom_id);
            const category = categories.find(c => c.category_id === mapping.category_id);
            const doctor = doctors.find(d => d.category_id === mapping.category_id);

            return {
                symptom_id: mapping.symptom_id,
                symptom: symptom?.symptom || 'Unknown',
                category: category?.name || 'Unknown',
                advice: mapping.advice_bangla,
                risk_level: mapping.risk_level,
                recommended_doctor: doctor?.doctor_bangla || mapping.recommended_doctor
            };
        });

        // Save to history if user is logged in
        if (user_id) {
            await CheckupHistory.create({
                user_id,
                symptoms: symptom_ids,
                results: results,
                date: new Date()
            });
        }

        res.json({
            overall_risk: overallRisk,
            total_symptoms: symptom_ids.length,
            results: results,
            message: '✅ চেকআপ সম্পন্ন হয়েছে'
        });
    } catch (error) {
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
};

module.exports = {
    getAllSymptoms,
    getSymptomsByCategory,
    checkSymptoms
};