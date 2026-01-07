import { EMI, EMIStressData, Insight } from '@/types';

export const calculateEMIStress = (
    emis: EMI[],
    monthlyIncome: number
): EMIStressData => {
    const totalEMI = emis.reduce((sum, emi) => sum + emi.monthlyAmount, 0);
    const stressPercentage = monthlyIncome > 0 ? (totalEMI / monthlyIncome) * 100 : 0;

    let healthStatus: 'healthy' | 'warning' | 'high-risk' = 'healthy';
    if (stressPercentage > 50) {
        healthStatus = 'high-risk';
    } else if (stressPercentage >= 30) {
        healthStatus = 'warning';
    }

    return {
        totalEMI,
        monthlyIncome,
        stressPercentage,
        healthStatus,
    };
};

export const generateInsights = (
    emis: EMI[],
    monthlyIncome: number
): Insight[] => {
    const insights: Insight[] = [];
    const stressData = calculateEMIStress(emis, monthlyIncome);

    // High stress insight
    if (stressData.stressPercentage > 50) {
        insights.push({
            type: 'danger',
            title: 'High Financial Stress Detected',
            message: `Your EMIs consume ${stressData.stressPercentage.toFixed(1)}% of your monthly income. Consider restructuring or consolidating your loans.`,
        });
    } else if (stressData.stressPercentage >= 30) {
        insights.push({
            type: 'warning',
            title: 'Moderate Financial Stress',
            message: `Your EMIs take up ${stressData.stressPercentage.toFixed(1)}% of your income. Keep an eye on your spending.`,
        });
    } else if (emis.length > 0) {
        insights.push({
            type: 'info',
            title: 'Healthy Financial Status',
            message: `Great job! Your EMI burden is only ${stressData.stressPercentage.toFixed(1)}% of your income.`,
        });
    }

    // Cashflow congestion - check if multiple EMIs fall in the same week
    const emisByWeek = getEMIsByWeek(emis);
    const congestedWeeks = emisByWeek.filter(week => week.emis.length > 1);

    if (congestedWeeks.length > 0) {
        const weekNumbers = congestedWeeks.map(w => w.week).join(', ');
        insights.push({
            type: 'warning',
            title: 'Cashflow Congestion Risk',
            message: `Multiple EMIs are due in week(s) ${weekNumbers} of the month. Plan your budget accordingly.`,
        });
    }

    // Early month risk - EMIs due before salary (assume salary on 1st)
    const earlyMonthEMIs = emis.filter(emi => emi.dueDate <= 5 && emi.dueDate !== 1);
    if (earlyMonthEMIs.length > 0) {
        insights.push({
            type: 'warning',
            title: 'Early-Month Payment Risk',
            message: `${earlyMonthEMIs.length} EMI(s) are due in the first week. Ensure you have sufficient balance from the previous month.`,
        });
    }

    // Multiple EMIs insight
    if (emis.length > 3) {
        insights.push({
            type: 'info',
            title: 'Multiple Active EMIs',
            message: `You have ${emis.length} active EMIs. Consider loan consolidation to simplify management.`,
        });
    }

    return insights;
};

export const getEMIsByWeek = (emis: EMI[]) => {
    const weeks = [
        { week: 1, range: '1-7', emis: [] as EMI[] },
        { week: 2, range: '8-14', emis: [] as EMI[] },
        { week: 3, range: '15-21', emis: [] as EMI[] },
        { week: 4, range: '22-31', emis: [] as EMI[] },
    ];

    emis.forEach(emi => {
        const dueDate = emi.dueDate;
        if (dueDate <= 7) weeks[0].emis.push(emi);
        else if (dueDate <= 14) weeks[1].emis.push(emi);
        else if (dueDate <= 21) weeks[2].emis.push(emi);
        else weeks[3].emis.push(emi);
    });

    return weeks;
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

export const getHealthStatusColor = (status: string): string => {
    switch (status) {
        case 'healthy':
            return 'text-success';
        case 'warning':
            return 'text-warning';
        case 'high-risk':
            return 'text-danger';
        default:
            return 'text-gray-600';
    }
};

export const getHealthStatusBg = (status: string): string => {
    switch (status) {
        case 'healthy':
            return 'bg-green-100';
        case 'warning':
            return 'bg-yellow-100';
        case 'high-risk':
            return 'bg-red-100';
        default:
            return 'bg-gray-100';
    }
};
