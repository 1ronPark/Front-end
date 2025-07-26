import { fetchRequest } from './fetchRequest';

export const serverCall = async <T, B = unknown>(
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
	url: string,
	body: B = {} as B,
	success?: string,
	fail?: string
): Promise<T> => {
	const data = await fetchRequest<T, B>({
		method,
		endpoint: url,
		body,
		errorMessage: fail,
		successMessage: success,
	});

	return data;
};