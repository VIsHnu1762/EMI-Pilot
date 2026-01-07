import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-blue-800 to-secondary flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">EMI-Pilot</h1>
                <p className="text-2xl text-blue-100 mb-8">Stay ahead of your EMIs</p>
                <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto">
                    Track your EMIs, calculate financial stress, and get predictive insights to manage your finances better.
                </p>

                <button
                    onClick={() => router.push('/income')}
                    className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 shadow-xl"
                >
                    Get Started →
                </button>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                        <div className="text-4xl mb-3">📊</div>
                        <h3 className="font-semibold mb-2">Track EMIs</h3>
                        <p className="text-sm text-blue-100">Manage all your EMIs in one place</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                        <div className="text-4xl mb-3">📈</div>
                        <h3 className="font-semibold mb-2">Financial Health</h3>
                        <p className="text-sm text-blue-100">Monitor your EMI stress levels</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
                        <div className="text-4xl mb-3">💡</div>
                        <h3 className="font-semibold mb-2">Smart Insights</h3>
                        <p className="text-sm text-blue-100">Get actionable financial guidance</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
