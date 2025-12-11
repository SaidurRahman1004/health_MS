const mongoose = require('mongoose');

const checkupHistorySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symptoms: [{
        type: String
    }],
    results: [{
        symptom_id: String,
        advice: String,
        risk_level: String,
        doctor: String
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CheckupHistory', checkupHistorySchema);