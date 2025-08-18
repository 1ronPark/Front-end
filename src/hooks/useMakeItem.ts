import { useApiMutation } from './apiHooks';

/**
 * 개별 포지션 정의
 */
export interface RecruitPosition {
  positionId: number | null;
  mainTasks: string;
  preferentialTreatment: string;
  preferMbti: string[];
  recruitNumber: number;
  updatedAt?: string;
}

/**
 * 카테고리 정의
 */
export interface ItemCategory {
  itemCategory: string;
}

/**
 * 지역 정의
 */
export interface CollaborationRegion {
  siDo: string;
  siGunGu: string;
}

/**
 * 실제 API 요청에 사용될 JSON 페이로드
 */
export interface CreateItemPayload {
  extraLink1?: string;
  extraLink2?: string;
  projectStatus: boolean;
  name: string;
  recruitPositions: RecruitPosition[];
  itemCategories: ItemCategory[];
  collaborationRegions: CollaborationRegion[];
  description: string;
  introduce: string;
}

export interface CreateItemParams {
  payload: CreateItemPayload;
  itemProfileImage: File;
  itemPlanFile: File;
}

/**
 * 비즈니스 객체를 multipart 형식의 FormData로 변환
 */
const buildFormData = ({
  payload,
  itemProfileImage,
  itemPlanFile,
}: CreateItemParams) => {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob([JSON.stringify(payload)], { type: 'application/json' }),
  );

  formData.append('itemProfileImage', itemProfileImage);
  formData.append('itemPlanFile', itemPlanFile);

  return formData;
};

/**
 * useMakeItem 훅
 *
 * - 내부적으로 useApiMutation(FormData)을 사용
 * - makeItem(params)를 호출하면 자동으로 FormData를 만들어 전송
 */
export const useMakeItem = () => {
  const mutation = useApiMutation<FormData, unknown>({
    method: 'POST',
    endpoint: import.meta.env.VITE_API_MAKE_ITEM_ENDPOINT,
  });

  /**
   * 편의 메서드
   */
  const makeItem = (params: CreateItemParams) => {
    const formData = buildFormData(params);
    mutation.mutate({ body: formData });
  };

  return { ...mutation, makeItem };
};