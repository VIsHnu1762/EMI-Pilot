const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET user income
router.get('/income', async (req, res) => {
    try {
        let user = await User.findOne();
        if (!user) {
            // Create default user with 0 income
            user = new User({ monthlyIncome: 0 });
            await user.save();
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching income', error: error.message });
    }
});

// POST/PUT update user income
router.post('/income', async (req, res) => {
    try {
        const { monthlyIncome } = req.body;

        if (monthlyIncome === undefined || monthlyIncome < 0) {
            return res.status(400).json({ message: 'Monthly income must be a positive number' });
        }

        let user = await User.findOne();

        if (!user) {
            // Create new user
            user = new User({ monthlyIncome });
            await user.save();
        } else {
            // Update existing user
            user.monthlyIncome = monthlyIncome;
            user.updatedAt = Date.now();
            await user.save();
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating income', error: error.message });
    }
});

module.exports = router;
