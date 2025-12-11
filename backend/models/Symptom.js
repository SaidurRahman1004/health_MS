const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
    symptom_id: {
        type: String,
        required: true,
        unique: true
    },
    symptom: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Symptom', symptomSchema);