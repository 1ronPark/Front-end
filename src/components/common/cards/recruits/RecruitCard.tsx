import { useState } from 'react';
import type { ChangeEvent } from "react";
import CloseIcon from '../../../../assets/icons/ic_close.svg';
import PartDropdown from '../../../common/dropdowns/PartDropdown';
import MbtiDropdown from '../../../common/dropdowns/MbtiDropdown';
import DeleteIcon from '../../../../assets/icons/ic_delete.svg';
import ProjectDescription from '../../../mypage/project/register/ProjectDescription';


interface RecruitCardProps {
  onDelete: () => void;
}

const RecruitCard = ({ onDelete }: RecruitCardProps) => {
  const [introText, setIntroText] = useState("");
  const maxLength = 3000;

  const [section, setSection] = useState<string | null>(null);
  const [mbtis, setMbtis] = useState<string[]>([]);

  const handleAddSection = (selected: string) => {
    setSection(selected);
  };

  const handleAddMbti = (mbti: string) => {
    if (mbtis.length < 3 && !mbtis.includes(mbti)) {
      setMbtis([...mbtis, mbti]);
    }
  };

  const handleRemoveSection = () => {
    setSection(null);
  };

  const handleRemoveMbti = (mbtiToRemove: string) => {
    setMbtis(mbtis.filter(mbti => mbti !== mbtiToRemove));
  };

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
            <PartDropdown onSelect={handleAddSection} />
            {section && (
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 w-30 justify-between">
                <span className="text-sm font-semimedium text-gray-700">
                  {section}
                </span>
                <button onClick={handleRemoveSection}>
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
              <span className = "text-[#6C63FF]">{introText.length}</span> / {maxLength}
            </span>
          </div>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-primary-500 focus:outline-none text-sm"
            rows={1}
            placeholder="파트원이 하게 될 주요 작업 내용을 입력해주세요."
            value={introText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setIntroText(e.target.value)
            }
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
            value={introText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setIntroText(e.target.value)
            }
            maxLength={maxLength}
          ></textarea>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">선호 MBTI</h3>
          </div>
          {/* MBTI 섹션 */}
          <div className="space-y-2">
            <MbtiDropdown onSelect={handleAddMbti} />
            <div className="flex flex-wrap gap-3">
              {mbtis.map(mbti => (
                <div
                  key={mbti}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2"
                >
                  <span className="text-sm font-semimedium text-gray-700">
                    {mbti}
                  </span>
                  <button onClick={() => handleRemoveMbti(mbti)}>
                    <img src={CloseIcon} alt="삭제" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
        <div className="flex items-cente justify-between">
          <div className="flex items-center mb-3">
            <h3 className="text-sm font-semibold">모집 인원</h3>
            <h3 className="text-sm font-semibold text-orange-500">*</h3>
          </div>
          <ProjectDescription />
        </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitCard;
