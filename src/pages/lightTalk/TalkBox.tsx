import { Image } from "lucide-react";
import sampleImg from "../../assets/icons/mypage/sample_profile.png";
import { useRef, useState } from "react";

//내 정보 props
interface LightTalkProps {
  id?: number;
  profileImage: string;
  univ?: string;
  role?: "디자이너" | "PM" | "Web" | "Android" | "ios" | "Server";
}

const TalkBox = ({ profileImage }: LightTalkProps) => {
  // 파일 input을 JS에서 직접 트리거하기 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // textarea 높이를 조절하기 위한 ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 업로드한 이미지들의 미리보기 URL 리스트
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // 텍스트 입력값 상태
  const [text, setText] = useState("");

  // 이미지 업로드 시 실행되는 함수
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...urls, ...prev]);

      // 이미지 삽입 마크업 추가
      const imageTags = urls
        .map((url) => `\n![uploaded-image](${url})`)
        .join("");
      setText((prev) => prev + imageTags);
    }
  };

  // 이미지 버튼 클릭 시 input[type="file"]을 강제로 클릭
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
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
    <div className="w-[640px] flex flex-col justify-center py-4 gap-2 rounded-[28px] shadow-xs bg-[#FEFEFE]">
      <div className="flex items-start gap-2 px-8">
        {/* 프로필 사진 */}
        <div className="w-[48px] h-[48px]">
          <img
            src={profileImage || sampleImg}
            className="rounded-[240px]"
            alt="profile"
          />
        </div>

        {/* 입력 창 */}
        <div className="w-full h-auto flex flex-col justify-center items-start gap-2">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="번뜩이는 아이디어가 있나요?"
            rows={1}
            className="w-full flex items-center pl-4 py-1 outline-none focus:ring-0 focus:outline-none resize-none"
          />

          {/* 이미지 슬라이드 영역 */}
          {imagePreviews.length > 0 && (
            <div className="w-full overflow-x-auto ">
              <div className="flex gap-2 w-[512px] pr-2">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`uploaded-${idx}`}
                    className="w-[240px] h-[240px] rounded-md object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-between items-center pl-[96px] pr-[32px]">
        {/* 이미지 버튼 */}
        <button
          onClick={handleImageButtonClick}
          className="w-10 h-10 flex justify-center items-center rounded-xl hover:bg-[rgba(73,69,79,0.08)]"
        >
          <Image className="text-[#47464F]" />
        </button>

        {/* 실제 숨겨진 input[type="file"] */}
        {/* 버튼에서 연결해서 ref를 이용해 파일 업로드 창을 강제로 띄우는 방식 */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
        />

        {/* 게시하기 */}
        <div className="flex h-[48px] justify-center items-center">
          <button
            className="flex justify-center items-center px-3 py-1.5
              rounded-xl border border-solid border-[#C8C5D0] hover:cursor-pointer hover:bg-[rgba(73,69,79,0.08)]"
          >
            <span>게시하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalkBox;
