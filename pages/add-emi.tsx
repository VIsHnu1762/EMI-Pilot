import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { emiService } from '@/lib/api';
import { EMI } from '@/types';

export default function AddEMIPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        monthlyAmount: '',
        dueDate: '',
        loanType: '',
        tenure: '',
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.name || !formData.monthlyAmount || !formData.dueDate) {
            setError('Please fill in all required fields');
            return;
        }

        const amount = parseFloat(formData.monthlyAmount);
        const dueDate = parseInt(formData.dueDate);

        if (amount <= 0) {
            setError('EMI amount must be greater than 0');
            return;
        }

        if (dueDate < 1 || dueDate > 31) {
            setError('Due date must be between 1 and 31');
            return;
        }

        setLoading(true);

        try {
            const newEMI: Omit<EMI, '_id'> = {
                name: formData.name,
                monthlyAmount: amount,
                dueDate: dueDate,
                loanType: formData.loanType || undefined,
                tenure: formData.tenure ? parseInt(formData.tenure) : undefined,
            };

            await emiService.createEMI(newEMI);

            setSuccess('EMI added successfully!');

            // Reset form
            setFormData({
                name: '',
                monthlyAmount: '',
                dueDate: '',
                loanType: '',
                tenure: '',
            });

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add EMI. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="card">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add EMI</h1>
                        <p className="text-gray-600 mb-6">
                            Enter your EMI details to start tracking
                        </p>

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="md:col-span-2">
                                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                        EMI Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g., Home Loan, Car Loan"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="monthlyAmount" className="block text-gray-700 font-semibold mb-2">
                                        Monthly Amount (₹) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="monthlyAmount"
                                        name="monthlyAmount"
                                        value={formData.monthlyAmount}
                                        onChange={handleChange}
                                        placeholder="e.g., 15000"
                                        className="input-field"
                                        required
                                        min="1"
                                        step="1"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="dueDate" className="block text-gray-700 font-semibold mb-2">
                                        Due Date (1-31) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        placeholder="e.g., 5"
                                        className="input-field"
                                        required
                                        min="1"
                                        max="31"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="loanType" className="block text-gray-700 font-semibold mb-2">
                                        Loan Type (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="loanType"
                                        name="loanType"
                                        value={formData.loanType}
                                        onChange={handleChange}
                                        placeholder="e.g., Personal, Home"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="tenure" className="block text-gray-700 font-semibold mb-2">
                                        Tenure (months) (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        id="tenure"
                                        name="tenure"
                                        value={formData.tenure}
                                        onChange={handleChange}
                                        placeholder="e.g., 24"
                                        className="input-field"
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Adding...' : 'Add EMI'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.push('/emis')}
                                    className="btn-secondary flex-1"
                                >
                                    View All EMIs
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
