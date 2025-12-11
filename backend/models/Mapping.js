const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema({
    symptom_id: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    advice_bangla: {
        type: String,
        required: true
    },
    risk_level: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    recommended_doctor: {
        type: String
    }
});

module.exports = mongoose.model('Mapping', mappingSchema);