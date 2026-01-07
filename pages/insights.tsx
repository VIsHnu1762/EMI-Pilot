import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import AlertCard from '@/components/AlertCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { emiService, userService } from '@/lib/api';
import { EMI } from '@/types';
import { generateInsights } from '@/lib/utils';

export default function InsightsPage() {
    const router = useRouter();
    const [emis, setEmis] = useState<EMI[]>([]);
    const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [emisData, userData] = await Promise.all([
                emiService.getAllEMIs(),
                userService.getIncome(),
            ]);
            setEmis(emisData);
            setMonthlyIncome(userData.monthlyIncome);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Generating insights..." />;
    }

    if (monthlyIncome === 0 || emis.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 py-12">
                    <div className="card text-center max-w-md mx-auto">
                        <div className="text-6xl mb-4">💡</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Data Yet</h2>
                        <p className="text-gray-600 mb-6">
                            Add your income and EMIs to see personalized insights
                        </p>
                        <div className="flex gap-3 justify-center">
                            {monthlyIncome === 0 && (
                                <button onClick={() => router.push('/income')} className="btn-primary">
                                    Set Income
                                </button>
                            )}
                            {emis.length === 0 && (
                                <button onClick={() => router.push('/add-emi')} className="btn-secondary">
                                    Add EMI
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const insights = generateInsights(emis, monthlyIncome);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Insights & Alerts</h1>
                    <p className="text-gray-600">Personalized financial guidance based on your EMIs</p>
                </div>

                {insights.length === 0 ? (
                    <div className="card text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">All Good!</h2>
                        <p className="text-gray-600">No alerts at the moment. Keep up the good work!</p>
                    </div>
                ) : (
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {insights.map((insight, index) => (
                            <AlertCard key={index} insight={insight} />
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="btn-secondary"
                    >
                        ← Back to Dashboard
                    </button>
                </div>

                {/* Tips Section */}
                <div className="mt-12 card max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Financial Tips</h3>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-success mr-2">✓</span>
                            <span>Keep your EMI burden below 30% of your income for a healthy financial status</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-2">✓</span>
                            <span>Maintain an emergency fund covering at least 6 months of EMIs</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-2">✓</span>
                            <span>Consider loan consolidation if you have multiple high-interest EMIs</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-2">✓</span>
                            <span>Set up auto-debit for EMI payments to avoid late fees and credit score impact</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-success mr-2">✓</span>
                            <span>Review and prepay high-interest loans when you have surplus funds</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
