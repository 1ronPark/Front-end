import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import kakaoIcon from "../../../assets/icons/lightTalk/ic_kakaotalk.svg";
import facebookIcon from "../../../assets/icons/lightTalk/ic_facebook.svg";
import instagramIcon from "../../../assets/icons/lightTalk/ic_instagram.svg";
import discordIcon from "../../../assets/icons/lightTalk/ic_discord.svg";

interface ShareModalProps {
  onClose: () => void;
}

const ShareModal = ({ onClose }: ShareModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#FFF] rounded-xl w-[520px] py-6 shadow-sm flex flex-col  gap-4 relative"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-3 top-4 flex justify-center items-center rounded-[100px] hover:bg-gray-100"
        >
          <X className="flex w-7 h-7" />
        </button>

        {/* 헤더 */}
        <div className="flex h-[112px] flex-col  gap-4">
          <div className="h-8 flex flex-col justify-center items-center gap-2.5">
            <p className="title-medium text-[#1C1B21]">라잇톡으로 공유</p>
          </div>
          <div className="h-12 flex justify-center items-center">
            <button className="h-10 flex justify-center items-center px-4 py-2.5 rounded-[100px] bg-[#F0ECF4] hover:bg-[rgba(73,69,79,0.10)] cursor-pointer">
              <p className="label-large text-[#47464F]">게시물 작성</p>
            </button>
          </div>
        </div>
        {/* 구분선 */}
        <div className="w-full h-px bg-[#E0E0E0]" />

        {/* 외부로 공유 */}
        <div className="h-8 flex gap-4 px-6">
          <p className="title-medium text-[#1C1B21]">외부로 공유</p>
        </div>
        {/* 외부 공유 아이콘 */}
        <div className="flex justify-center items-center px-6 gap-4 ">
          {/* 카카오톡 */}
          <div className="flex flex-col items-center text-sm">
            <img src={kakaoIcon} alt="kakao" className="w-10 h-10" />
            <span className="mt-1">카카오톡</span>
          </div>
          {/* 페이스북 */}
          <div className="flex flex-col items-center text-sm">
            <img src={facebookIcon} alt="facebook" className="w-10 h-10" />
            <span className="mt-1">페이스북</span>
          </div>
          {/* 인스타그램 */}
          <div className="flex flex-col items-center text-sm">
            <img src={instagramIcon} alt="instagram" className="w-10 h-10" />
            <span className="mt-1">인스타그램</span>
          </div>
          {/* 디스코드 */}
          <div className="flex flex-col items-center text-sm">
            <img src={discordIcon} alt="discord" className="w-10 h-10" />
            <span className="mt-1">디스코드</span>
          </div>
        </div>

        {/* 공유 링크 */}
        <div className="flex justify-between items-center border rounded-lg px-4 py-2 text-sm">
          <input
            type="text"
            readOnly
            value={window.location.href}
            className="flex-1 outline-none text-[#49454F] bg-transparent"
          />
          <button
            className="ml-2 px-3 py-1 text-sm border border-[#CAC4D0] rounded-lg text-[#3F2E63] hover:bg-[#F4EFF4]"
            onClick={handleCopy}
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
