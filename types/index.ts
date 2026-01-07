export interface EMI {
    _id?: string;
    name: string;
    monthlyAmount: number;
    dueDate: number;
    loanType?: string;
    tenure?: number;
    createdAt?: Date;
}

export interface User {
    _id?: string;
    monthlyIncome: number;
    updatedAt?: Date;
}

export interface Insight {
    type: 'info' | 'warning' | 'danger';
    title: string;
    message: string;
}

export interface EMIStressData {
    totalEMI: number;
    monthlyIncome: number;
    stressPercentage: number;
    healthStatus: 'healthy' | 'warning' | 'high-risk';
}
