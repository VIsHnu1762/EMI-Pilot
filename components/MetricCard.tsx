import React from 'react';

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    bgColor?: string;
    textColor?: string;
    icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    subtitle,
    bgColor = 'bg-white',
    textColor = 'text-gray-800',
    icon,
}) => {
    return (
        <div className={`card ${bgColor}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <h2 className={`text-3xl font-bold ${textColor} mb-1`}>{value}</h2>
                    {subtitle && (
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    )}
                </div>
                {icon && (
                    <div className="ml-4 text-4xl opacity-20">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetricCard;
