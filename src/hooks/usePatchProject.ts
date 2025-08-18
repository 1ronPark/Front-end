import { useApiMutation } from "../hooks/apiHooks";
import { AxiosError } from "axios";

export interface UsePatchMyProjectParams {
  projectId: string;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

export const usePatchMyProject = ({
  projectId,
  onSuccess,
  onError,
}: UsePatchMyProjectParams) => {
  return useApiMutation<FormData, void>({
    method: "PATCH",
    endpoint: import.meta.env.VITE_API_PATCH_ITEM_ENDPOINT.replace(":id", projectId.toString()),
    onSuccess,
    onError: (error) => {
      if (onError && (error as AxiosError).isAxiosError) {
        onError(error as AxiosError);
      }
    },
  });
};