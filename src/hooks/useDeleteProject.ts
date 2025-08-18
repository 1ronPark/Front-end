import axios from 'axios';
import { useApiMutation } from '../hooks/apiHooks';

interface DeleteProjectParams {
  endpoint: string;
}

export const useDeleteMyProject = () => {
  return useApiMutation<undefined, DeleteProjectParams>({
    method: 'DELETE',
    endpoint: '', // 사용 시점에 endpoint를 직접 전달
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data);
      } else {
        console.error('Unexpected Error:', error);
      }
    },
  });
};