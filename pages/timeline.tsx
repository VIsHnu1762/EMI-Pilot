import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { emiService } from '@/lib/api';
import { EMI } from '@/types';
import { getEMIsByWeek, formatCurrency } from '@/lib/utils';

export default function TimelinePage() {
    const router = useRouter();
    const [emis, setEmis] = useState<EMI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const emisData = await emiService.getAllEMIs();
            setEmis(emisData);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading timeline..." />;
    }

    if (emis.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 py-12">
                    <div className="card text-center max-w-md mx-auto">
                        <div className="text-6xl mb-4">📅</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No EMIs Yet</h2>
                        <p className="text-gray-600 mb-6">Add EMIs to see your payment timeline</p>
                        <button onClick={() => router.push('/add-emi')} className="btn-primary">
                            Add EMI
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const weeklyData = getEMIsByWeek(emis);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">EMI Timeline</h1>
                    <p className="text-gray-600">See when your EMIs are due throughout the month</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {weeklyData.map((week) => {
                        const weekTotal = week.emis.reduce((sum, emi) => sum + emi.monthlyAmount, 0);
                        const hasMultipleEMIs = week.emis.length > 1;

                        return (
                            <div
                                key={week.week}
                                className={`card ${hasMultipleEMIs ? 'border-2 border-warning bg-yellow-50' : ''}`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            Week {week.week}
                                        </h3>
                                        <p className="text-gray-600">Days {week.range}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Weekly Total</p>
                                        <p className="text-2xl font-bold text-primary">
                                            {formatCurrency(weekTotal)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {week.emis.length} EMI{week.emis.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>

                                {hasMultipleEMIs && (
                                    <div className="bg-warning/20 border border-warning rounded-lg px-4 py-2 mb-4">
                                        <p className="text-sm text-gray-700">
                                            ⚡ Multiple EMIs due this week - plan your cashflow
                                        </p>
                                    </div>
                                )}

                                {week.emis.length === 0 ? (
                                    <div className="text-center py-6 text-gray-400">
                                        <p>No EMIs due this week</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {week.emis
                                            .sort((a, b) => a.dueDate - b.dueDate)
                                            .map((emi) => (
                                                <div
                                                    key={emi._id}
                                                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-4">
                                                            <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                                                                {emi.dueDate}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-800">{emi.name}</h4>
                                                                {emi.loanType && (
                                                                    <p className="text-sm text-gray-500">{emi.loanType}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xl font-bold text-primary">
                                                                {formatCurrency(emi.monthlyAmount)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="btn-secondary"
                    >
                        ← Back to Dashboard
                    </button>
                </div>

                {/* Legend */}
                <div className="mt-8 card max-w-md mx-auto bg-blue-50">
                    <h3 className="font-semibold text-gray-800 mb-3">📌 Legend</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-100 border border-warning rounded"></div>
                            <span>Week with multiple EMIs (cashflow congestion risk)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
                            <span>Normal week</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
