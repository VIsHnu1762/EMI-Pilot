import axios from 'axios';
import { EMI, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const emiService = {
    // Get all EMIs
    getAllEMIs: async (): Promise<EMI[]> => {
        const response = await api.get('/emis');
        return response.data;
    },

    // Get single EMI
    getEMI: async (id: string): Promise<EMI> => {
        const response = await api.get(`/emis/${id}`);
        return response.data;
    },

    // Create EMI
    createEMI: async (emi: Omit<EMI, '_id'>): Promise<EMI> => {
        const response = await api.post('/emis', emi);
        return response.data;
    },

    // Update EMI
    updateEMI: async (id: string, emi: Partial<EMI>): Promise<EMI> => {
        const response = await api.put(`/emis/${id}`, emi);
        return response.data;
    },

    // Delete EMI
    deleteEMI: async (id: string): Promise<void> => {
        await api.delete(`/emis/${id}`);
    },

    // Get summary
    getSummary: async () => {
        const response = await api.get('/emis/summary/all');
        return response.data;
    },
};

export const userService = {
    // Get user income
    getIncome: async (): Promise<User> => {
        const response = await api.get('/user/income');
        return response.data;
    },

    // Update user income
    updateIncome: async (monthlyIncome: number): Promise<User> => {
        const response = await api.post('/user/income', { monthlyIncome });
        return response.data;
    },
};
