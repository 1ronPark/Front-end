import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  // console.log('인터셉터 토큰:', token);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
    // console.log('최종 Authorization 헤더:', config.headers.Authorization);
  }
  return config;
});

export default axiosInstance;