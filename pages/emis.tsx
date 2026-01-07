import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import EMICard from '@/components/EMICard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { emiService } from '@/lib/api';
import { EMI } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function EMIsPage() {
    const router = useRouter();
    const [emis, setEmis] = useState<EMI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [editingEMI, setEditingEMI] = useState<EMI | null>(null);

    useEffect(() => {
        fetchEMIs();
    }, []);

    const fetchEMIs = async () => {
        try {
            const data = await emiService.getAllEMIs();
            setEmis(data);
        } catch (err) {
            setError('Failed to fetch EMIs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this EMI?')) {
            return;
        }

        try {
            await emiService.deleteEMI(id);
            setEmis(emis.filter(emi => emi._id !== id));
        } catch (err) {
            alert('Failed to delete EMI');
            console.error(err);
        }
    };

    const handleEdit = (emi: EMI) => {
        setEditingEMI(emi);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingEMI || !editingEMI._id) return;

        try {
            const updated = await emiService.updateEMI(editingEMI._id, editingEMI);
            setEmis(emis.map(emi => emi._id === updated._id ? updated : emi));
            setEditingEMI(null);
        } catch (err) {
            alert('Failed to update EMI');
            console.error(err);
        }
    };

    const totalEMI = emis.reduce((sum, emi) => sum + emi.monthlyAmount, 0);

    if (loading) {
        return <LoadingSpinner message="Loading your EMIs..." />;
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Your EMIs</h1>
                        <p className="text-gray-600">
                            {emis.length} {emis.length === 1 ? 'EMI' : 'EMIs'} | Total: {formatCurrency(totalEMI)}/month
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.push('/add-emi')}
                            className="btn-secondary"
                        >
                            + Add EMI
                        </button>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="btn-primary"
                        >
                            View Dashboard →
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {editingEMI && (
                    <div className="card mb-8 bg-blue-50 border-2 border-secondary">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit EMI</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    value={editingEMI.name}
                                    onChange={(e) => setEditingEMI({ ...editingEMI, name: e.target.value })}
                                    className="input-field"
                                    placeholder="EMI Name"
                                    required
                                />
                                <input
                                    type="number"
                                    value={editingEMI.monthlyAmount}
                                    onChange={(e) => setEditingEMI({ ...editingEMI, monthlyAmount: parseFloat(e.target.value) })}
                                    className="input-field"
                                    placeholder="Monthly Amount"
                                    required
                                    min="1"
                                />
                                <input
                                    type="number"
                                    value={editingEMI.dueDate}
                                    onChange={(e) => setEditingEMI({ ...editingEMI, dueDate: parseInt(e.target.value) })}
                                    className="input-field"
                                    placeholder="Due Date"
                                    required
                                    min="1"
                                    max="31"
                                />
                                <input
                                    type="text"
                                    value={editingEMI.loanType || ''}
                                    onChange={(e) => setEditingEMI({ ...editingEMI, loanType: e.target.value })}
                                    className="input-field"
                                    placeholder="Loan Type (Optional)"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button type="submit" className="btn-primary">
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingEMI(null)}
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {emis.length === 0 ? (
                    <div className="card text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No EMIs Yet</h2>
                        <p className="text-gray-600 mb-6">Start by adding your first EMI</p>
                        <button
                            onClick={() => router.push('/add-emi')}
                            className="btn-primary"
                        >
                            Add Your First EMI
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {emis.map((emi) => (
                            <EMICard
                                key={emi._id}
                                emi={emi}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
