import { Upload } from "lucide-react";
import { useApiMutation } from "../../../../hooks/apiHooks";
import { useRegisterProjectStore } from "../../../../store/registerProjectStore"; // zustand 상태 import
import type { CreateProjectResponse } from "../../../../hooks/useProject";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Save = () => {
  // zustand 전역 상태에서 프로젝트 정보 가져오기
  const {
    name: projectName,
    introduce: projectSubtitle,
    itemProfileImage,
    itemPlanFile,
    //topics
  } = useRegisterProjectStore();

  // API 호출을 위한 훅 세팅
  const createProject = useApiMutation<FormData, CreateProjectResponse>({
    method: "POST",
    endpoint: `${import.meta.env.VITE_API_ITEMS_ENDPOINT}`,
    onSuccess: (res: CreateProjectResponse) => {
      // 응답 성공 여부 확인
      if (!res.isSuccess) {
        alert("등록 실패: " + res.message || "알 수 없는 오류입니다.");
        return;
      }

      const { itemName } = res.result;
      alert(`프로젝트 '${itemName}'이(가) 성공적으로 등록되었습니다!`);

      navigate("/myprofile?tab=projects");
    },
    onError: (err: unknown) => {
      if (axios.isAxiosError(err)) {
        const code = err.response?.data?.code;
        const message = err.response?.data?.message;
        if (code === "ITEM_ALREADY_EXISTS") {
          alert("이미 등록된 프로젝트입니다.");
        } else {
          alert("에러 발생: " + (message || err.message));
        }
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    },
  });

  // 제출 로직
  const handleSubmit = () => {
    // Save.tsx handleSubmit 맨 위
    // console.log('[DEBUG] store', useRegisterProjectStore.getState());
    const missingFields: string[] = [];
      if (!projectName) missingFields.push("프로젝트명");
      if (!projectSubtitle) missingFields.push("프로젝트 소개");
      if (!itemProfileImage) missingFields.push("프로젝트 썸네일(대표이미지)");
      if (!itemPlanFile) missingFields.push("기획 파일(첨부 파일)");

      if (missingFields.length > 0) {
        alert(`다음 항목을 입력/첨부해주세요:\n- ${missingFields.join('\n- ')}`);
        return;
      }

      const formData = new FormData();

      const {
        projectStatus,
        name,
        recruitPositions,
        itemCategories,
        collaborationRegions,
        description,
        introduce,
        extraLink1,
        extraLink2,
      } = useRegisterProjectStore.getState();

      const sanitizedCollaborationRegions = collaborationRegions.filter(
        (r) => r.siDo.trim() !== '' && r.siGunGu.trim() !== ''
      );

      const requestPayload = {
        extraLink1,
        extraLink2,
        projectStatus,
        name,
        recruitPositions: recruitPositions.map(pos => ({
          ...pos,
          preferMbti: Array.isArray(pos.preferMbti)
            ? pos.preferMbti.join(',') // preferMbti가 배열이면 string으로 변환
            : pos.preferMbti || '',
        })),
        itemCategories,
        collaborationRegions: sanitizedCollaborationRegions,
        description,
        introduce,
      };

      formData.append("itemProfileImage", itemProfileImage!);
      formData.append("itemPlanFile", itemPlanFile!);
      formData.append("request", JSON.stringify(requestPayload));

        // 🔥 FormData 실제 내용 콘솔로 찍기
      // for (const [key, value] of formData.entries()) {
      //   console.log('FormData', key, value);
      // }
      // console.log('store recruitPositions:', recruitPositions, typeof recruitPositions);
      // console.log('store itemCategories:', itemCategories, typeof itemCategories);
      // console.log('store collaborationRegions:', collaborationRegions, typeof collaborationRegions);
      createProject.mutate({body:formData});
  };

  const navigate = useNavigate();
  return (
    <div className="flex justify-center py-6">
      <button
        onClick={handleSubmit}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#5A5891] px-14 py-4 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-[#4A477C]"
      >
        <Upload size={20} />
        <span>프로젝트 게시</span>
      </button>
    </div>
  );
};

export default Save;
