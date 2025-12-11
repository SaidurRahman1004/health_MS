const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    default_risk: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    }
});

module.exports = mongoose.model('Category', categorySchema);