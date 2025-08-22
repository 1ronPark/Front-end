import { Plus } from "lucide-react";
import PortfolioCard from "../../common/cards/portfolio/PortfolioCard";
// import githubIcon from "../../../assets/GitHub.svg";
import { useState } from "react";
// import type { ChangeEvent } from "react";
import PortfolioModal from "../modal/PortfolioModal";

import { useUploadPortfolioFile } from "../../../hooks/useMyPortfolioList";
import { useUploadPortfolioLink } from "../../../hooks/useMyPortfolioList";


type PortfolioItemData =
  | { type: 'file'; file: File }
  | { type: 'github' | 'blog'; url: string };

const Portfolio = () => {
  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);
  // const [introText, setIntroText] = useState("");
  // const maxLength = 3000;

  const [portfolioItems, setPortfolioItems] = useState<
    { id: number; name: string; fileUrl: string }[]
  >([]);

  const handleClearAll = () => {
    setPortfolioItems([]);
  };

  const uploadFile = useUploadPortfolioFile();
  const uploadLink = useUploadPortfolioLink();
 

  const handleConfirm = (data: PortfolioItemData) => {
    if (data.type === 'file') {
      const formData = new FormData();
      formData.append("portfolioFile", data.file);
      formData.append(
        "request",
        new Blob(
          [JSON.stringify({ name: data.file.name })],
          { type: "application/json" }
        )
      );
      uploadFile.mutate(
        { body: formData },
        {
          onSuccess: (data) => {
            setPortfolioItems((prev) => [...prev, data]);
          },
        }
      );
    } else if (data.type === 'github' || data.type === 'blog') {
      uploadLink.mutate(
        {
          body: {
            fileUrl: data.url,
            name: data.url.split('/').pop() || '링크 포트폴리오',
          },
        },
        {
          onSuccess: (data) => {
            setPortfolioItems((prev) => [...prev, data]);
          },
        }
      );
    }
    setPortfolioModal(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold"> 포트폴리오</h2>
        <hr className="my-4 border-[#EAE9EA]" />
        </div>
          {/* 추후 api 연동 시 사용 
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">자기소개</h3>
                <h3 className="text-lg font-semibold text-orange-500">*</h3>
              </div>
              <span className="text-sm text-gray-500">
                <span className = "text-[#6C63FF]">{introText.length}</span> / {maxLength}
              </span>
            </div>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-4 text-gray-700 focus:border-primary-500 focus:outline-none"
              rows={5}
              placeholder="포트폴리오가 없어도 자신을 어필할 수 있어요."
              value={introText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setIntroText(e.target.value)
              }
              maxLength={maxLength}
            ></textarea>
          </div>
          */}

      {/* <hr className="y-2 border-[#EAE9EA]" /> */}
      <div className="space-y-4">
        <div className='flex justify-between'>
          <h3 className="text-lg font-semibold">포트폴리오 파일, 링크</h3>
          <div className="flex justify-end">
            <button
              onClick={handleClearAll}
              className="mb-2 rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 font-medium hover:bg-gray-200"
            >
              전체 초기화
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          <p>하나씩 추가해주세요!</p>
          <p>PDF 파일만 가능하며, 파일명은 영문(알파벳) 및 숫자로 구성해주세요.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <PortfolioCard
              key={item.id}
              title={
                item.fileUrl && item.fileUrl.startsWith('http')
                  ? item.name
                  : item.fileUrl?.split('/').pop() || item.name
              }
              imageUrl="https://dummyimage.com/400x300/cccccc/000000.png&text=Portfolio"
              onDelete={() =>
                setPortfolioItems((prev) =>
                  prev.filter((el) => el.id !== item.id)
                )
              }
            />
          ))}
          {portfolioItems.length < 3 && (
            <div className="flex h-63 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 hover:scale-105">
              <button
                onClick={() => setPortfolioModal(true)}
                className="flex w-full h-full flex-col items-center justify-center gap-2 text-gray-500 hover:cursor-pointer"
              >
                <Plus size={48} />
              </button>
            </div>
          )}
        </div>
        {portfolioModal && (
          <PortfolioModal 
            onClose={() => setPortfolioModal(false)}
            onConfirm={handleConfirm} />
        )}
      </div>
    </div>
  );
};

export default Portfolio;
