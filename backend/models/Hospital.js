const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospital_id: {
        type: String,
        required: true,
        unique: true
    },
    name_bangla: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    contact: {
        type: String
    },
    services: [{
        type: String
    }]
});

module.exports = mongoose.model('Hospital', hospitalSchema);