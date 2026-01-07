const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    monthlyIncome: {
        type: Number,
        required: true,
        min: 0,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
