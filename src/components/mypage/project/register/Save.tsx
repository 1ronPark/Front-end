import { Upload } from "lucide-react";
import { useApiMutation } from "../../../../hooks/apiHooks";
import { useRegisterProjectStore } from "../../../../store/registerProjectStore"; // zustand 상태 import
import type { CreateProjectResponse } from "../../../../hooks/useProject";
import axios from "axios";

const Save = () => {
  // zustand 상태에서 프로젝트 정보 가져오기
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
    endpoint: "/api/v1/items",
    onSuccess: (res: CreateProjectResponse) => {
      // 응답 성공 여부 확인
      if (!res.isSuccess) {
        alert("등록 실패: " + res.message || "알 수 없는 오류입니다.");
        return;
      }

      const { itemName } = res.result;
      alert(`프로젝트 '${itemName}'이(가) 성공적으로 등록되었습니다!`);

      // 필요하면 페이지 이동도 가능
      // navigate(`/mypage/${memberId}`);
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
console.log('[DEBUG] store', useRegisterProjectStore.getState());
    if (
      !projectName ||
      !projectSubtitle ||
      !itemProfileImage ||
      !itemPlanFile
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("itemName", projectName); //서버 명세에 맞는 키로 변경하여 제출
    formData.append("introduction", projectSubtitle);
    formData.append("itemProfileImage", itemProfileImage);
    formData.append("itemPlanFile", itemPlanFile);

    createProject.mutate(formData);
  };

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
