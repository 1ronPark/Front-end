import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, Method } from 'axios';

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
	errorMessage,
	// successMessage,
}: FetchRequestParams<B>): Promise<T> => {
	try {
		console.log('디버깅 용도 body 출력:', body);
		const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
		console.log('디버깅용 token 출력:', token);

		const headers: Record<string, string> = {};
		if (!(body instanceof FormData)) {
			headers['Content-Type'] = 'application/json';
		}
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const config: AxiosRequestConfig = {
			method: method as Method,
			url: `${import.meta.env.VITE_API_URL}${endpoint}`,
			headers,
			withCredentials: true,
			data: ['POST', 'PUT', 'PATCH'].includes(method) ? body : undefined,
			params: method === 'GET' ? body : undefined,
		};

		const response = await axios.request<T>(config);
		console.log('axios response:', response);

		return response.data;
	} catch (err: unknown) {
        const axiosError = err as AxiosError<{ message?: string }>;
		console.error('axios error:', err);

		const msg =
			axiosError?.response?.data?.message ||
			axiosError?.message ||
			errorMessage ||
			'API 요청 중 오류 발생';

		throw new Error(msg);
	}
};
