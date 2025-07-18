import { MapPin, Briefcase, Wrench, FilePenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Reception from "../mypage/edit/Reception";

const MyProfileEdit = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 justify-center overflow-y-auto mx-[100px]">
      <div className="w-[960px] mb-4">
        <h1 className="text-2xl font-semibold">프로필 관리</h1>
        <p className="text-gray-500">
          지원 후 수정한 프로필 내용(회원정보 제외)은 지원한 프로필에 반영 되지
          않아요!
        </p>
      </div>
      <hr className="w-[960px] mb-16 border-t border-[#CBC4CF]" />

      <Reception />

      <div className="w-[960px]">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">2025. 07. 03 최종 수정됨</p>
          </div>
          <button
            onClick={() =>
              navigate("/myprofile/edit") && console.log("수정 모드 진입")
            }
            className="flex items-center gap-1 text-primary-600 font-medium text-sm hover:underline"
            type="button"
          >
            <FilePenLine size={15} />
            수정하기
          </button>
        </div>

        <div className="rounded-lg bg-white p-8 shadow">
          <h3 className="mb-5 text-2xl font-semibold">
            기술과 디자인을 넘나들며 방향을 설계하는 실전형 디자이너
          </h3>
          <hr className="mb-5 border-t border-[#CBC4CF]" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <p className="font-semibold w-20 shrink-0">위치</p>
              <p className="ml-10">
                가천대학교 글로벌 캠퍼스, 서울 강남구, 성남 전체
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gray-600" />
              <p className="font-semibold w-20 shrink-0">파트</p>
              <p className="ml-10">Design</p>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-gray-600" />
              <p className="font-semibold w-20 shrink-0">사용 가능 툴</p>
              <p className="ml-10">Figma, Adobe XD, Notion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileEdit;
