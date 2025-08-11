import type { AxiosError, AxiosRequestConfig, Method } from 'axios';
import axiosInstance from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';

const getToken = () => useAuthStore.getState().token;

type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetchRequestParams<B = unknown> {
	method: FetchMethod;
	endpoint: string;
	body?: B;
	errorMessage?: string;
	successMessage?: string;
}

export const fetchRequest = async <T, B = unknown>({
	method,
	endpoint,
	body,
	// successMessage, /* 디버깅할 때 편하려고 localstorage에 토큰 있긴함, 실제로는 쿠키로 구현 */
}: FetchRequestParams<B>): Promise<T> => {
	console.log('🔍 fetchRequest endpoint:', endpoint);
    console.log('🔍 axios baseURL:', axiosInstance.defaults.baseURL);

	try {
		// console.log('디버깅 용도 body 출력:', body);
		const token = getToken();
		// console.log('디버깅용 token 출력:', token);

		const headers: Record<string, string> = {};
		if (!(body instanceof FormData)) {
			headers['Content-Type'] = 'application/json';
		}
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const config: AxiosRequestConfig = {
			method: method as Method,
			url: endpoint,
			headers,
			withCredentials: true,
			data: ['POST', 'PUT', 'PATCH'].includes(method) ? body : undefined,
			params: method === 'GET' ? body : undefined,
		};

		console.log('🔍 최종 요청 URL:', config.url);
    console.log('🔍 최종 config:', config);


		const response = await axiosInstance.request<T>(config);
		// console.log('axios response:', response);

		return response.data;
	} catch (err: unknown) {
        const axiosError = err as AxiosError<{ message?: string }>;
		console.error('axios error:', err);

		throw axiosError
	}
};
