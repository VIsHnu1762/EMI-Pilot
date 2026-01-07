const mongoose = require('mongoose');

const emiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    monthlyAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    dueDate: {
        type: Number,
        required: true,
        min: 1,
        max: 31,
    },
    loanType: {
        type: String,
        trim: true,
    },
    tenure: {
        type: Number,
        min: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('EMI', emiSchema);
