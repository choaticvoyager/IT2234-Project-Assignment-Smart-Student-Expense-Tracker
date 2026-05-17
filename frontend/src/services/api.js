import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data) => api.post('/api/auth/register', data);
export const login = (data) => api.post('/api/auth/login', data);

export const getTransactions = () => api.get('/api/transactions');
export const createTransaction = (data) => api.post('/api/transactions', data);
export const updateTransaction = (id, data) => api.put(`/api/transactions/${id}`, data);
export const deleteTransaction = (id) => api.delete(`/api/transactions/${id}`);
export const getSummary = () => api.get('/api/transactions/summary');

export const createBudget = (data) => api.post('/api/budgets', data);
export const getBudgetStatus = (month) =>
  api.get(`/api/budgets/status?month=${month}`);

export default api;