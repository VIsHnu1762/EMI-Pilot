import React from 'react';
import { EMI } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface EMICardProps {
    emi: EMI;
    onEdit?: (emi: EMI) => void;
    onDelete?: (id: string) => void;
}

const EMICard: React.FC<EMICardProps> = ({ emi, onEdit, onDelete }) => {
    return (
        <div className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{emi.name}</h3>
                    {emi.loanType && (
                        <span className="text-sm text-gray-500">{emi.loanType}</span>
                    )}
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                        {formatCurrency(emi.monthlyAmount)}
                    </p>
                    <p className="text-sm text-gray-500">per month</p>
                </div>
            </div>

            <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">Due Date:</span>
                    <span className="font-semibold text-gray-800">
                        {emi.dueDate}{getOrdinalSuffix(emi.dueDate)} of every month
                    </span>
                </div>

                {emi.tenure && (
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Tenure:</span>
                        <span className="font-semibold text-gray-800">{emi.tenure} months</span>
                    </div>
                )}
            </div>

            {(onEdit || onDelete) && (
                <div className="flex gap-2 mt-4">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(emi)}
                            className="flex-1 bg-secondary hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200"
                        >
                            Edit
                        </button>
                    )}
                    {onDelete && emi._id && (
                        <button
                            onClick={() => onDelete(emi._id!)}
                            className="flex-1 bg-danger hover:bg-red-600 text-white py-2 rounded-lg transition-colors duration-200"
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

export default EMICard;
