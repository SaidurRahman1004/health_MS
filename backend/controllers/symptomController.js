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
        console.error('Error in getAllSymptoms:', error);
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
        console.error('Error in getSymptomsByCategory:', error);
        res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
    }
};

// @desc    Check symptoms and get diagnosis
// @route   POST /api/symptoms/check
// @access  Public
const checkSymptoms = async (req, res) => {
    try {
        console.log('Received request body:', req.body);

        const { symptom_ids, user_id } = req.body;

        // Validation
        if (!symptom_ids || symptom_ids.length === 0) {
            return res.status(400).json({ message: 'অন্তত একটি লক্ষণ নির্বাচন করুন' });
        }

        console.log('Checking symptoms:', symptom_ids);

        // Get mappings for selected symptoms
        const mappings = await Mapping.find({ symptom_id: { $in: symptom_ids } });
        console.log('Found mappings:', mappings.length);

        if (mappings.length === 0) {
            return res.status(200).json({
                overall_risk: 'Low',
                total_symptoms: symptom_ids.length,
                results: [],
                message: '⚠️ এই লক্ষণগুলোর জন্য কোনো সুনির্দিষ্ট তথ্য পাওয়া যায়নি। অনুগ্রহ করে ডাক্তারের পরামর্শ নিন।'
            });
        }

        // Get symptoms details
        const symptoms = await Symptom.find({ symptom_id: { $in: symptom_ids } });
        console.log('Found symptoms:', symptoms.length);

        // Get categories
        const categoryIds = [... new Set(mappings.map(m => m.category_id))];
        const categories = await Category.find({ category_id: { $in: categoryIds } });
        console.log('Found categories:', categories.length);

        // Get doctors
        const doctors = await Doctor.find({ category_id: { $in: categoryIds } });
        console.log('Found doctors:', doctors.length);

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

        console.log('Prepared results:', results.length);

        // Save to history if user is logged in
        if (user_id) {
            try {
                await CheckupHistory.create({
                    user_id,
                    symptoms: symptom_ids,
                    results: results,
                    date: new Date()
                });
                console.log('History saved for user:', user_id);
            } catch (historyError) {
                console.error('Error saving history:', historyError);
                // Don't fail the request if history save fails
            }
        }

        const response = {
            overall_risk: overallRisk,
            total_symptoms: symptom_ids.length,
            results: results,
            message: '✅ চেকআপ সম্পন্ন হয়েছে'
        };

        console.log('Sending response:', response);
        res.json(response);

    } catch (error) {
        console.error('Error in checkSymptoms:', error);
        res.status(500).json({
            message: 'সার্ভার এরর',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

module.exports = {
    getAllSymptoms,
    getSymptomsByCategory,
    checkSymptoms
};