import React from 'react';
import { Insight } from '@/types';

interface AlertCardProps {
    insight: Insight;
}

const AlertCard: React.FC<AlertCardProps> = ({ insight }) => {
    const getAlertStyles = () => {
        switch (insight.type) {
            case 'danger':
                return {
                    bgColor: 'bg-red-50',
                    borderColor: 'border-danger',
                    iconColor: 'text-danger',
                    icon: '⚠️',
                };
            case 'warning':
                return {
                    bgColor: 'bg-yellow-50',
                    borderColor: 'border-warning',
                    iconColor: 'text-warning',
                    icon: '⚡',
                };
            case 'info':
                return {
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-secondary',
                    iconColor: 'text-secondary',
                    icon: 'ℹ️',
                };
            default:
                return {
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-300',
                    iconColor: 'text-gray-600',
                    icon: '📌',
                };
        }
    };

    const styles = getAlertStyles();

    return (
        <div
            className={`${styles.bgColor} border-l-4 ${styles.borderColor} p-4 rounded-lg shadow-sm`}
        >
            <div className="flex items-start">
                <div className="text-2xl mr-3">{styles.icon}</div>
                <div className="flex-1">
                    <h3 className={`font-semibold ${styles.iconColor} mb-1`}>
                        {insight.title}
                    </h3>
                    <p className="text-gray-700 text-sm">{insight.message}</p>
                </div>
            </div>
        </div>
    );
};

export default AlertCard;
