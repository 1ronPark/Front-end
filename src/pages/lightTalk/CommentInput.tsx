import { useRef, useState } from "react";

interface CommentInputProps {
  profileImage?: string;
  onSubmit: (text: string) => void;
}

const CommentInput = ({ profileImage, onSubmit }: CommentInputProps) => {
  const [text, setText] = useState("");

  // textarea 높이를 조절하기 위한 ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  // 텍스트 입력 시 자동으로 textarea 높이 늘리기
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 초기화
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // 자동 증가
    }
  };

  return (
    <div className="w-[608px] flex items-start bg-[#F5F5F7] px-4 py-2 rounded-[12px] gap-4">
      {/* 프로필 이미지 */}
      <div className="h-12 w-12 flex justify-center items-center shrink-0 aspect-square ">
        <img
          src={profileImage || ""}
          alt="profile"
          className="flex w-12 h-12 rounded-[240px] bg-gray-200 object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        {/* 입력창*/}
        <div className="w-[400px] flex items-center pl-4 py-1">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={handleTextChange}
            placeholder="이 라잇톡에 대한 생각을 공유해 보세요"
            className="w-full py-1 resize-none outline-none body-large-emphasis text-[#1C1B21] placeholder:text-gray-400"
          />
        </div>
        {/* 등록하기 버튼 */}
        <div className="w-[512px] flex justify-end items-center gap-4 py-2">
          <button
            onClick={handleSubmit}
            className="w-[75px] h-[34px]
            flex justify-center items-center text-sm text-[#3F2E63] 
            border border-[#C8C5D0] rounded-xl hover:bg-[#ECE8F4]"
          >
            <p className="label-large-emphasis text-[#47464F]">등록하기</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
