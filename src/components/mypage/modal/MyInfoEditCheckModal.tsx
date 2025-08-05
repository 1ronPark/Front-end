import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onCloseAll: () => void;
};

const MyInfoEditCheckModal = ({ onClose, onCloseAll }: Props) => {
  return (
    <div className="fixed inset-0 z-60 bg-black/10  flex items-center justify-center">
      <div
        className="relative flex flex-col justify-center w-[420px] py-16 gap-16
      bg-white rounded-2xl shadow-xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/*닫기 버튼*/}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#1D1B20] hover:cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="headline-small-emphasis">
          변경사항을 저장하려면
          <br /> 계정 비밀번호를 입력해 주세요
        </h2>

        <div className="px-4 flex flex-col w-full">
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            className="w-full h-[48px] body-large px-8 mt-4 rounded-full border border-[#1D1B20]/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <NavLink
            to="/passwordReset"
            className="pl-4 mt-2 flex text-sm text-[#68548E] underline cursor-pointer"
          >
            비밀번호를 잊으셨나요?
          </NavLink>
        </div>
        {/* 확인 버튼 */}
        <div className="w-full px-8">
          <div className="w-full h-[56px] flex justify-end items-center">
            <button
              onClick={onCloseAll}
              className="w-[123px] h-full rounded-xl bg-[#68548E] title-medium text-white hover:cursor-pointer
            hover:bg-[#7C69B3] transition-colors duration-200"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoEditCheckModal;
