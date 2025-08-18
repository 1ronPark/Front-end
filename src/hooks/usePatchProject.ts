import { useApiMutation } from "../hooks/apiHooks";
import { AxiosError } from "axios";

interface PatchMyProjectBody {
  title?: string;
  sub_title?: string;
  categories?: string[];
  // 여기에 필요한 필드들 추가
  extraLink1?: string;
  extraLink2?: string;
  projectStatus?: boolean;
  name?: string;
  recruitPositions?: {
    positionId: number;
    mainTasks: string;
    preferentialTreatment: string;
    preferMbti: string;
    recruitNumber: number;
  }[];
  itemCategories?: {
    itemCategory: string;
  }[];
  collaborationRegions?: {
    siDo: string;
    siGunGu: string;
  }[];
  description?: string;
  introduce?: string;
}

interface UsePatchMyProjectParams {
  projectId: number;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}

export const usePatchMyProject = ({
  projectId,
  onSuccess,
  onError,
}: UsePatchMyProjectParams) => {
  return useApiMutation<PatchMyProjectBody, void>({
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