import { useProjectDetailCtx } from "../../../types/ProjectDetailContext";
import type { ProjectRecruitPosition } from "../../../types/ProjectDetailProps";

// 줄바꿈/쉼표/• 기준으로 설명을 리스트로 쪼개는 유틸
const toItems = (s?: string) =>
  (s ?? "")
    .split(/\r?\n|,|•/g)
    .map((t) => t.trim())
    .filter(Boolean);

const RecruitItem = ({ p }: { p: ProjectRecruitPosition }) => {
  const mainTasks = toItems(p.mainTasks);
  const prefer = toItems(p.preferentialTreatment);
  const mbti = toItems(p.preferMbti);

  return (
    <>
{/* 모집 파트 제목 */}
<div className="mt-6 w-full">              
  <div className="flex items-baseline gap-2 text-left">  {/* ← 왼쪽 정렬 */}
    <span className="headline-medium-emphasis text-[#1C1B21]">
      {p.positionName}
    </span>
    <span className="title-medium-emphasis text-[#6C63FF]">
      {p.recruitNumber}명
    </span>
    <span className="title-medium-emphasis text-[#1C1B21]">
      모집 중
    </span>
  </div>
</div>


      {/* 합류하면 함께 할 작업 */}
      <div className="flex flex-col items-start justify-center py-6 gap-4">
        <div className="title-large text-black">합류하면 함께 할 작업이예요</div>
        {mainTasks.length > 0 ? (
          <ul className="ml-6 body-large text-[#47464F] list-disc space-y-1">
            {mainTasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        ) : (
          <span className="ml-6 body-large text-[#9A98A3]">설명 없음</span>
        )}
      </div>

      {/* 우대사항 */}
      <div className="flex flex-col items-start justify-center py-6 gap-4">
        <div className="title-large text-black">이런 분과 함께하고 싶어요</div>
        {prefer.length > 0 ? (
          <ul className="ml-6 body-large text-[#47464F] list-disc space-y-1">
            {prefer.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        ) : (
          <span className="ml-6 body-large text-[#9A98A3]">우대사항 없음</span>
        )}
      </div>

      {/* MBTI */}
      <div className="flex flex-col items-start justify-center py-6 gap-4">
        <div className="title-large text-black">아래 MBTI와 궁합이 좋아요</div>
        <span className="ml-6 body-large text-[#47464F]">
          {mbti.length > 0 ? mbti.join(", ") : "제한 없음"}
        </span>
      </div>
    </>
  );
};

const RecruitPart = () => {
  const { recruitPositions } = useProjectDetailCtx();

  if (!recruitPositions || recruitPositions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[rgba(121,116,126,0.08)] p-12">
        <p className="title-large-emphasis">현재 모집 중인 파트</p>
        <p className="mt-4 body-large text-[#9A98A3]">모집 중인 파트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="title-large-emphasis mb-4">현재 모집 중인 파트</p>

      <div className="flex flex-col items-start bg-white rounded-lg border border-[rgba(121,116,126,0.08)] py-6 px-12 w-full">
        {recruitPositions.map((p, idx) => (
          <div key={`${p.positionName}-${idx}`} className="w-full">
            <RecruitItem p={p} />
            {idx < recruitPositions.length - 1 && (
              <hr className="border-t w-full border-[rgba(121,116,126,0.16)] mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitPart;
