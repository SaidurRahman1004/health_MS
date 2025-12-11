const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    category_id: {
        type: String,
        required: true
    },
    doctor_type: {
        type: String,
        required: true
    },
    doctor_bangla: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);