import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import { userService } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export default function IncomePage() {
    const router = useRouter();
    const [income, setIncome] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [currentIncome, setCurrentIncome] = useState<number>(0);

    useEffect(() => {
        // Fetch current income if exists
        userService.getIncome()
            .then(user => {
                if (user.monthlyIncome > 0) {
                    setCurrentIncome(user.monthlyIncome);
                }
            })
            .catch(err => console.error('Error fetching income:', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const incomeValue = parseFloat(income);

        if (isNaN(incomeValue) || incomeValue <= 0) {
            setError('Please enter a valid income amount greater than 0');
            return;
        }

        setLoading(true);

        try {
            await userService.updateIncome(incomeValue);
            router.push('/add-emi');
        } catch (err) {
            setError('Failed to save income. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    <div className="card">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Monthly Income</h1>
                        <p className="text-gray-600 mb-6">
                            Let's start by setting up your monthly income
                        </p>

                        {currentIncome > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-600">Current Income</p>
                                <p className="text-2xl font-bold text-primary">
                                    {formatCurrency(currentIncome)}
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="income" className="block text-gray-700 font-semibold mb-2">
                                    Enter Monthly Income (₹)
                                </label>
                                <input
                                    type="number"
                                    id="income"
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                                    placeholder="e.g., 50000"
                                    className="input-field"
                                    required
                                    min="1"
                                    step="1"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : 'Continue →'}
                            </button>
                        </form>

                        {currentIncome > 0 && (
                            <button
                                onClick={() => router.push('/add-emi')}
                                className="w-full mt-3 text-secondary hover:text-blue-700 font-semibold"
                            >
                                Skip to Add EMI
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
