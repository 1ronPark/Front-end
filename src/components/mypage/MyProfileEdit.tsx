import { MapPin, Briefcase, Wrench, FilePenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../hooks/useProfile";

const MyProfileEdit = () => {
  const navigate = useNavigate();

  //프로필 정보 가져오기
  const { data: myInfo, isLoading, error } = useGetProfile();
  const regions = myInfo?.result?.regions ?? [];
  const skills = myInfo?.result?.skills ?? [];

  if (isLoading) return <div>불러오는 중...</div>;
  if (error) return <div>에러 발생 또는 데이터 없음</div>;

  return (
    <div className="w-full flex justify-center overflow-y-auto">
      <div className="w-[960px] flex flex-col">
        <div className="flex flex-col justify-center items-start gap-4 mb-4">
          <h1 className="text-2xl font-semibold">프로필 관리</h1>
          <li className="text-gray-500">
            프로필을 완성하여 샤로운 제안을 받아보세요!
          </li>
        </div>

        <hr className="w-[960px] mb-6 border-t border-[#CBC4CF]" />

        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="title-small text-[#47464F]">
              {/* ⚠️ 저장시간을 저장하는 도메인 필요 백에 요청해야될듯 !! */}
              최종수정일: {myInfo?.result.activities?.[0]?.startDate ?? "알 수 없음"}
            </p>
          </div>
          <button
            onClick={() =>
              navigate("/myprofile/edit") && console.log("수정 모드 진입")
            }
            className="flex items-center gap-1 text-primary-600 font-medium text-sm hover:underline"
            type="button"
          >
            <FilePenLine size={15} />
            <p className="text-[#47464F]">수정하기</p>
          </button>
        </div>

        <div className="rounded-lg bg-white p-8 border mt-5 border-gray-200 shadow-sm">
          <h3 className="mb-5 text-2xl font-semibold">
            {myInfo?.result.profileTitle
              ? myInfo?.result.profileTitle
              : "한 줄 소개로 자신을 소개해 보세요!"}
          </h3>
          <hr className="mb-5 border-t border-[#CBC4CF]" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <p className="font-semibold w-20 shrink-0">위치</p>
              <p className="ml-10">
                {myInfo?.result.school}{" "}
                <span>
                  {regions.map((r) => `${r.siDo} ${r.siGunGu}`).join(", ")}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gray-600" />
              <p className="font-semibold w-20 shrink-0">파트</p>
              <p className="ml-10">{myInfo?.result.positions}</p>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-gray-600" />
              <p className="font-semibold w-20 shrink-0">스킬</p>
              <p className="ml-10">
                {" "}
                <span>
                  {skills.length === 0
                    ? "스킬을 등록해주세요."
                    : skills.map((r) => `${r.name}`).join(", ")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileEdit;
