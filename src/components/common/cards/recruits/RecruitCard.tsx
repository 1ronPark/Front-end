import CloseIcon from '../../../../assets/icons/ic_close.svg';
import PartDropdown from '../../../common/dropdowns/PartDropdown';
import MbtiDropdown from '../../../common/dropdowns/MbtiDropdown';
import DeleteIcon from '../../../../assets/icons/ic_delete.svg';
import ProjectDescription from '../../../mypage/project/register/ProjectDescription';
import type { RecruitPosition } from '../../../../hooks/useMakeItem';


interface RecruitCardProps {
  recruit: RecruitPosition;
  onUpdateRecruit: (updated: RecruitPosition) => void;
  onDelete: () => void;
}

// 컴포넌트 상단(혹은 utils 폴더)에서 아래 함수 선언
const PART_OPTIONS = [
  { id: 1, name: '프론트엔드' },
  { id: 2, name: '백엔드' },
  { id: 3, name: '디자인' },
  { id: 4, name: '기획' },
  { id: 5, name: '홍보' },
];

function getPartNameById(id: number | null) {
  if (id === null) return '';
  const part = PART_OPTIONS.find(option => option.id === id);
  return part ? part.name : '';
}

const RecruitCard = ({ recruit, onUpdateRecruit, onDelete }: RecruitCardProps) => {
  const maxLength = 3000;

return (
  <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-md">
      <div className="mb-4 flex justify-end">
        <button
          onClick={onDelete}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500"
        >
          <img src={DeleteIcon} alt="지우기" className="h-5 w-5" />
          <span>지우기</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center">
            <h3 className="text-sm font-semibold">파트</h3>
            <h3 className="text-sm font-semibold text-orange-500">*</h3>
          </div>
          {/* 파트 섹션 */}
          <div className="space-y-2">
            <PartDropdown
              selected={recruit.positionId}
              onSelect={id => onUpdateRecruit({ ...recruit, positionId: id })}
            />
            {/* 선택된 파트명이 있을 경우에만 표시 (선택적) */}
            {recruit.positionId != null && recruit.positionId !== 0 &&getPartNameById(recruit.positionId) && (
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 w-30 justify-between text-sm">
                <span>{getPartNameById(recruit.positionId)}</span>
                <button onClick={() => onUpdateRecruit({ ...recruit, positionId: null })}>
                  <img src={CloseIcon} alt="삭제" className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-sm font-semibold">주요 작업 내용</h3>
              <h3 className="text-sm font-semibold text-orange-500">*</h3>
            </div>
            <span className="text-sm text-gray-500">
              <span className = "text-[#6C63FF]">{recruit.mainTasks.length}</span> / {maxLength}
            </span>
          </div>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-primary-500 focus:outline-none text-sm"
            rows={1}
            placeholder="파트원이 하게 될 주요 작업 내용을 입력해주세요."
            value={recruit.mainTasks}
            onChange={e => onUpdateRecruit({ ...recruit, mainTasks: e.target.value })}
            maxLength={maxLength}
          ></textarea>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">이런 능력이 있다면 좋아요</h3>
          </div>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-primary-500 focus:outline-none text-sm"
            rows={1}
            placeholder="우대 사항에 대해 입력해주세요."
            value={recruit.preferentialTreatment}
            onChange={e => onUpdateRecruit({ ...recruit, preferentialTreatment: e.target.value })}
            maxLength={maxLength}
          ></textarea>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">선호 MBTI</h3>
          </div>
          {/* MBTI 섹션 */}
          <MbtiDropdown
            selected={recruit.preferMbti}
            onSelect={mbti => {
              if (Array.isArray(recruit.preferMbti)) {
                // 최대 3개까지, 중복 선택 방지
                if (recruit.preferMbti.length < 3 && !recruit.preferMbti.includes(mbti)) {
                  onUpdateRecruit({
                    ...recruit,
                    preferMbti: [...recruit.preferMbti, mbti],
                  });
                }
              }
            }}
          />
          <div className="flex flex-wrap gap-3">
            {Array.isArray(recruit.preferMbti) &&
              recruit.preferMbti.map(mbti => (
                <div
                  key={mbti}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2"
                >
                  <span className="text-sm font-semimedium text-gray-700">{mbti}</span>
                  <button
                    onClick={() =>
                      onUpdateRecruit({
                        ...recruit,
                        preferMbti: recruit.preferMbti.filter(
                          m => m !== mbti
                        ),
                      })
                    }
                  >
                    <img src={CloseIcon} alt="삭제" className="h-4 w-4" />
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-cente justify-between">
            <div className="flex items-center mb-3">
              <h3 className="text-sm font-semibold">모집 인원</h3>
              <h3 className="text-sm font-semibold text-orange-500">*</h3>
            </div>
            <ProjectDescription
              value={recruit.recruitNumber}
              onChange={v => onUpdateRecruit({ ...recruit, recruitNumber: v })}
            />
          </div>
        </div>
      </div>
    </div>
)};

export default RecruitCard;
