import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const registerUser = (data) => axios.post(`${API_URL}/api/user/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/api/user/login`, data);
export const verifyOtp = (data) => axios.post(`${API_URL}/api/user/verify-otp`, data);
export const forgotPassword = (data) => axios.post(`${API_URL}/api/user/forgot-password`, data);
export const resetPassword = (data) => axios.post(`${API_URL}/api/user/reset-password`, data);

export const joblist = (data) => axios.get(`${API_URL}/api/jobs/list`, data);
