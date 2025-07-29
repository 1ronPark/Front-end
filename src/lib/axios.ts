import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env에서 설정한 서버 주소
  withCredentials: true, // 인증 쿠키 전송 시 필요
});

export default axiosInstance;