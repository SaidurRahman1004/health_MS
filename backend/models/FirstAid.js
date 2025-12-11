const mongoose = require('mongoose');

const firstAidSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    steps: [{
        type: String
    }]
});

module.exports = mongoose.model('FirstAid', firstAidSchema);