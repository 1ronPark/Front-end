import { useParams } from "react-router-dom";
import { useApiQuery } from "./apiHooks";

type ProjectEditResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ProjectEditData;
  success: boolean;
};

type ProjectEditData = {
  itemId: number;
  itemName: string;
  introduce: string;
  extraLink1: string;
  extraLink2: string;
  description: string;
  itemCategories: { categoryName: string }[];
  itemProfileImageUrl: string;
  itemPlanFileUrl: string;
  projectStatus: boolean;
  regions: { siDo: string; siGunGu: string }[];
  recruitPositions: {
    positionId: number;
    recruitNumber: number;
    mainTasks: string;
    preferentialTreatment: string;
    preferMbti: string;
  }[];
};

const useGetEditProjectInfo = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return useApiQuery<ProjectEditResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_ITEM_FOR_EDIT.replace(":id", projectId),
    enabled: !!projectId,
  });
};

export default useGetEditProjectInfo;