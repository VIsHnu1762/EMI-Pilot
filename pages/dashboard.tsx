import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import MetricCard from '@/components/MetricCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { emiService, userService } from '@/lib/api';
import { EMI } from '@/types';
import { calculateEMIStress, formatCurrency, getHealthStatusColor, getHealthStatusBg } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DashboardPage() {
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
        return <LoadingSpinner message="Loading dashboard..." />;
    }

    if (monthlyIncome === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 py-12">
                    <div className="card text-center max-w-md mx-auto">
                        <div className="text-6xl mb-4">💰</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Set Your Income First</h2>
                        <p className="text-gray-600 mb-6">Please set up your monthly income to view the dashboard</p>
                        <button onClick={() => router.push('/income')} className="btn-primary">
                            Set Income
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const stressData = calculateEMIStress(emis, monthlyIncome);
    const remaining = monthlyIncome - stressData.totalEMI;

    const pieData = [
        { name: 'EMI', value: stressData.totalEMI, color: '#EF4444' },
        { name: 'Remaining', value: Math.max(0, remaining), color: '#22C55E' },
    ];

    const barData = [
        { name: 'Monthly Income', amount: monthlyIncome },
        { name: 'Total EMI', amount: stressData.totalEMI },
        { name: 'Remaining', amount: remaining },
    ];

    const getHealthStatusText = () => {
        switch (stressData.healthStatus) {
            case 'healthy':
                return 'Healthy';
            case 'warning':
                return 'Warning';
            case 'high-risk':
                return 'High Risk';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Your financial overview at a glance</p>
                </div>

                {/* Health Status Banner */}
                <div className={`${getHealthStatusBg(stressData.healthStatus)} border-l-4 ${stressData.healthStatus === 'healthy' ? 'border-success' : stressData.healthStatus === 'warning' ? 'border-warning' : 'border-danger'} p-6 rounded-lg shadow-md mb-8`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                EMI Health Status: {getHealthStatusText()}
                            </h2>
                            <p className="text-gray-700">
                                {stressData.healthStatus === 'healthy' && 'Your EMI burden is under control. Keep it up!'}
                                {stressData.healthStatus === 'warning' && 'Your EMI burden is moderate. Monitor your expenses carefully.'}
                                {stressData.healthStatus === 'high-risk' && 'Your EMI burden is high. Consider debt restructuring or consolidation.'}
                            </p>
                        </div>
                        <div className={`text-6xl font-bold ${getHealthStatusColor(stressData.healthStatus)}`}>
                            {stressData.stressPercentage.toFixed(1)}%
                        </div>
                    </div>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <MetricCard
                        title="Monthly Income"
                        value={formatCurrency(monthlyIncome)}
                        subtitle="Your total monthly earnings"
                        bgColor="bg-white"
                        textColor="text-primary"
                        icon="💰"
                    />
                    <MetricCard
                        title="Total EMI"
                        value={formatCurrency(stressData.totalEMI)}
                        subtitle={`${emis.length} active EMI(s)`}
                        bgColor="bg-white"
                        textColor="text-danger"
                        icon="📊"
                    />
                    <MetricCard
                        title="EMI Stress"
                        value={`${stressData.stressPercentage.toFixed(1)}%`}
                        subtitle={getHealthStatusText()}
                        bgColor={getHealthStatusBg(stressData.healthStatus)}
                        textColor={getHealthStatusColor(stressData.healthStatus)}
                        icon="📈"
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Pie Chart */}
                    <div className="card">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Income vs EMI</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div className="card">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Breakdown</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                                <Bar dataKey="amount" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => router.push('/insights')}
                        className="btn-primary"
                    >
                        View Insights & Alerts →
                    </button>
                    <button
                        onClick={() => router.push('/timeline')}
                        className="btn-secondary"
                    >
                        View EMI Timeline
                    </button>
                </div>
            </div>
        </div>
    );
}
