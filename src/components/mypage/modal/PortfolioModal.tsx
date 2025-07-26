import { X } from "lucide-react";
import { useState } from "react";

interface PortfolioProps {
  onClose: () => void;
}

const PortfolioModal = ({ onClose }: PortfolioProps) => {
  const [activeTab, setActiveTab] = useState<"file" | "url">("file");

  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
      {/* 바깥 클릭 시 닫기 */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 모달 박스 */}
      <div
        className="relative z-10 w-[520px] bg-white flex flex-col py-8 rounded-xl gap-12 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center px-8">
          <p className="headline-small-emphasis">포트폴리오 등록</p>
          <button
            onClick={onClose}
            className="flex justify-center items-center hover:cursor-pointer"
          >
            <X className="w-[32px] h-[32px]" />
          </button>
        </div>

        {/* 탭 */}
        <div className="flex h-[48px] px-8">
          {[
            { id: "file", label: "파일 첨부" },
            { id: "url", label: "URL 등록" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "file" | "url")}
              className="relative w-full h-full flex flex-col px-4 py-3.5 justify-center items-center flex-1 title-small text-[#1D1B20]"
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#68548E]" />
              )}
            </button>
          ))}
        </div>

        {/* 내용 영역 */}
        <div className="px-8 w-full">
          {activeTab === "file" ? (
            // 파일 첨부 UI
            <div className="h-[56px] flex flex-col justify-center items-center gap-6">
              <div className="w-full h-full flex items-center gap-4">
                <input
                  type="text"
                  disabled
                  placeholder="등록할 파일을 찾아주세요."
                  className="h-full flex-1 pl-4 py-1 rounded-xl bg-gray-100 text-sm placeholder:text-[#AAA]"
                />
                <button className="w-[123px] h-full flex justify-center items-center rounded-xl bg-[#F2ECF4] hover:bg-[#D8CEF0] cursor-pointer">
                  <p className="py-4 px-6 title-medium text-[#49454E]">
                    파일 선택
                  </p>
                </button>
              </div>
            </div>
          ) : (
            // URL 등록 UI
            <div className="flex flex-col gap-6">
              {/* Github 임베드 */}
              <div className="flex flex-col gap-2 w-full">
                <label className="body-medium text-[#49454E]">
                  Github 임베드
                </label>
                <div className="flex gap-4">
                  <input
                    type="url"
                    placeholder="URL 을 입력해 주세요"
                    className="flex-1 h-[56px] px-4 py-1 rounded-xl border border-gray-300 placeholder:text-[#AAA]"
                  />
                  <button className="w-[80px] h-[56px] rounded-xl bg-[#F2ECF4] hover:bg-[#D8CEF0] title-medium text-[#49454E]">
                    등록
                  </button>
                </div>
              </div>

              {/* 블로그 임베드 */}
              <div className="flex flex-col gap-2 w-full">
                <label className="body-medium text-[#49454E]">
                  블로그 임베드
                </label>
                <div className="flex gap-4">
                  <input
                    type="url"
                    placeholder="URL 을 입력해 주세요"
                    className="flex-1 h-[56px] px-4 py-1 rounded-xl border border-gray-300 placeholder:text-[#AAA]"
                  />
                  <button className="w-[80px] h-[56px] rounded-xl bg-[#F2ECF4] hover:bg-[#D8CEF0] title-medium text-[#49454E]">
                    등록
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 확인 버튼 */}
        <div className="w-full px-8">
          <div className="w-full h-[56px] flex justify-end items-center">
            <button className="w-[123px] h-full rounded-xl bg-[#68548E] title-medium text-white hover:cursor-pointer">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
