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
      <div className="absolute inset-0 " onClick={onClose}></div>
      {/* 모달 박스 */}
      <div
        className="relative z-10 w-[520px] h-auto bg-[#FFF] flex flex-col py-8 rounded-xl gap-12 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 부분 */}
        <div className="flex justify-between items-center px-8">
          <p className="headline-small-emphasis">포트폴리오 등록</p>
          <button
            onClick={onClose}
            className="flex justify-center items-center hover:cursor-pointer"
          >
            <X className="w-[32px] h-[32px]" />
          </button>
        </div>
        {/* 파일첨부 & URL 등록 */}
        <div className="flex h-[48px] px-8 flex-row items-start ">
          {[
            { id: "file", label: "파일 첨부" },
            { id: "url", label: "URL 등록" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "file" | "url")}
              className="relative  w-full h-full flex flex-col px-4 py-3.5 justify-center items-center flex-1 title-small text-[#1D1B20]"
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#68548E]"></span>
              )}
            </button>
          ))}
        </div>
        {/* 파일 선택 부분 */}
        <div className="h-[56px] flex flex-col justify-center items-center px-8 gap-6">
          <div className="w-full h-full flex items-center gap-4">
            <input
              type="text"
              disabled={true}
              placeholder="등록할 파일을 찾아주세요."
              className="h-full flex flex-1 items-start gap-1 pl-4 py-1 rounded-xl bg-gray-100"
            />
            <button className="w-[123px] h-full flex justify-center items-center rounded-xl bg-[#F2ECF4] hover:bg-[#D8CEF0] cursor-pointer">
              <p className="flex justify-center items-center gap-2 py-4 px-6 title-medium text-[#49454E]">
                파일 선택
              </p>
            </button>
          </div>
        </div>
        {/* 적용 부분 */}
        <div className="w-[520px] h-[56px] px-8 flex justify-end items-center gap-3">
          <button
            className="w-[123px] h-[56px] flex justify-center items-center rounded-xl
          bg-[#68548E] title-medium text-[#FFF] hover:cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
