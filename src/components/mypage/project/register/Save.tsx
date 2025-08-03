import { Upload } from "lucide-react";
import { useApiMutation } from "../../../../hooks/apiHooks";
import { useProjectStore } from "../../../../store/useProjectStore"; // zustand 상태 import

const Save = () => {
  const {
    projectName: itemName,
    projectSubtitle,
    itemProfileImage,
    itemPlanFile,
  } = useProjectStore();

  const createProject = useApiMutation({
    method: "POST",
    endpoint: "/api/v1/items",
    onSuccess: () => alert("프로젝트가 등록되었습니다."),
    onError: (err) => alert(err.message),
  });

  const handleSubmit = () => {
    if (!itemName || !projectSubtitle || !itemProfileImage || !itemPlanFile) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("itemName", itemName);
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
