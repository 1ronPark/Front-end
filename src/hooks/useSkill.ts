import { useApiMutation, useApiQuery } from "./apiHooks";

export interface Skill {
  skillId: number;
  skillName: string;
}

export interface getSkillsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    skills: Skill[];
  };
}

type UseGetSkillsOptions = {
  enabled?: boolean;
};

interface PostSkillResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    skillName: string;
    memberName: string;
  };
  success: boolean;
}

interface PostSkillRequest {
  skillId: number;
}

// 포지션에 따라 스킬을 가져오는 훅
export const useGetSkills = (
  positionName?: string | null,
  options: UseGetSkillsOptions = {}
) => {
  const enabled = options.enabled ?? Boolean(positionName);
  return useApiQuery<getSkillsResponse>({
    method: "GET",
    endpoint: import.meta.env.VITE_API_GET_SKILLS_ENDPOINT,
    params: positionName ? { positionName } : undefined,
    enabled,
  });
};

// 스킬을 추가하는 훅
export const usePostSkills = () => {
  return useApiMutation<PostSkillRequest, PostSkillResponse>({
    method: "POST",
    endpoint: import.meta.env.VITE_API_POST_SKILLS_ENDPOINT, // 기본값 (호출 시 덮어씀)
    onSuccess: (data) => {
      alert(`스킬 ${data.result.skillName}이(가) 등록되었습니다.`);
    },
    onError: (error) => {
      console.error("스킬 등록 실패:", error);
      alert("스킬 등록에 실패했습니다. 다시 시도해 주세요.");
    },
  });
};

export const useDeleteSkillById = () =>
  useApiMutation<undefined, { result: { skillId: number } }>({
    method: "DELETE",
    endpoint: import.meta.env.VITE_API_POST_SKILLS_ENDPOINT, // 호출할 때 /{id} 로 덮어씀
    onSuccess: (data) => {
      console.log("스킬 삭제 성공:", data);
      alert(`스킬이 성공적으로 삭제되었습니다.`);
    },
    onError: (error) => {
      console.error("스킬 삭제 실패:", error);
      alert("스킬 삭제에 실패했습니다. 다시 시도해 주세요.");
    },
  });
