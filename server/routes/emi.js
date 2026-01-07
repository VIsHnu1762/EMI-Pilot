const express = require('express');
const router = express.Router();
const EMI = require('../models/EMI');

// GET all EMIs
router.get('/', async (req, res) => {
    try {
        const emis = await EMI.find().sort({ dueDate: 1 });
        res.json(emis);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching EMIs', error: error.message });
    }
});

// GET single EMI by ID
router.get('/:id', async (req, res) => {
    try {
        const emi = await EMI.findById(req.params.id);
        if (!emi) {
            return res.status(404).json({ message: 'EMI not found' });
        }
        res.json(emi);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching EMI', error: error.message });
    }
});

// POST create new EMI
router.post('/', async (req, res) => {
    try {
        const { name, monthlyAmount, dueDate, loanType, tenure } = req.body;

        // Validation
        if (!name || !monthlyAmount || !dueDate) {
            return res.status(400).json({ message: 'Name, monthlyAmount, and dueDate are required' });
        }

        if (monthlyAmount <= 0) {
            return res.status(400).json({ message: 'Monthly amount must be greater than 0' });
        }

        if (dueDate < 1 || dueDate > 31) {
            return res.status(400).json({ message: 'Due date must be between 1 and 31' });
        }

        const newEMI = new EMI({
            name,
            monthlyAmount,
            dueDate,
            loanType,
            tenure,
        });

        const savedEMI = await newEMI.save();
        res.status(201).json(savedEMI);
    } catch (error) {
        res.status(500).json({ message: 'Error creating EMI', error: error.message });
    }
});

// PUT update EMI
router.put('/:id', async (req, res) => {
    try {
        const { name, monthlyAmount, dueDate, loanType, tenure } = req.body;

        // Validation
        if (monthlyAmount !== undefined && monthlyAmount <= 0) {
            return res.status(400).json({ message: 'Monthly amount must be greater than 0' });
        }

        if (dueDate !== undefined && (dueDate < 1 || dueDate > 31)) {
            return res.status(400).json({ message: 'Due date must be between 1 and 31' });
        }

        const updatedEMI = await EMI.findByIdAndUpdate(
            req.params.id,
            { name, monthlyAmount, dueDate, loanType, tenure },
            { new: true, runValidators: true }
        );

        if (!updatedEMI) {
            return res.status(404).json({ message: 'EMI not found' });
        }

        res.json(updatedEMI);
    } catch (error) {
        res.status(500).json({ message: 'Error updating EMI', error: error.message });
    }
});

// DELETE EMI
router.delete('/:id', async (req, res) => {
    try {
        const deletedEMI = await EMI.findByIdAndDelete(req.params.id);

        if (!deletedEMI) {
            return res.status(404).json({ message: 'EMI not found' });
        }

        res.json({ message: 'EMI deleted successfully', emi: deletedEMI });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting EMI', error: error.message });
    }
});

// GET summary
router.get('/summary/all', async (req, res) => {
    try {
        const emis = await EMI.find();
        const totalEMI = emis.reduce((sum, emi) => sum + emi.monthlyAmount, 0);
        const count = emis.length;

        res.json({
            totalEMI,
            count,
            emis,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching summary', error: error.message });
    }
});

module.exports = router;
