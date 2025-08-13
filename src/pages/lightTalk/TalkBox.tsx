import { Image, X } from "lucide-react";
import sampleImg from "../../assets/icons/mypage/sample_profile.png";
import { useRef, useState } from "react";
//결과 테스트 하려고 useEffect 사용
// import { useEffect } from "react";

//내 정보 props
interface LightTalkProps {
  id?: number;
  profileImage: string;
  school?: string;
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

  //텍스트 결과 변수
  // const [result, setResult] = useState(""); // ← 상태로 저장
  //result 때문에 빨간줄 뜨는거 방지코드
  // console.log(result);

  // 이미지 업로드 시 실행되는 함수
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...urls, ...prev]);

      // 이미지 삽입 마크업 추가
      // const imageTags = urls
      //   .map((url) => `\n![uploaded-image](${url})`)
      //   .join("");
      // setText((prev) => prev + imageTags);
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

  const handlePost = () => {
    const postData = {
      text: text,
      images: imagePreviews, //이미지 URL 포함
    };
    //전송할 데이터가 있으면
    if (postData.text !== "" || postData.images.length !== 0) {
      //여기서 서버 전송 로직 추가
      console.log("전송할 데이터: ", postData);
      setText(text);
      setText("");
      setImagePreviews([]);
    }
  };

  // 입력이 되나 테스트 창
  // useEffect(() => {
  //   console.log("result:\n", result);
  // }, [result]);

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
        </div>
      </div>

      {imagePreviews.length > 0 && (
        <div className="flex flex-col items-start px-6 py-4 gap-2.5">
          <div className="flex flex-wrap gap-4">
            {imagePreviews.map((src, idx) => (
              <div
                key={idx}
                className="relative flex w-[240px] h-[240px] justify-end items-center aspect-square"
              >
                <img
                  src={src}
                  alt={`uploaded-${idx}`}
                  className="w-full h-full object-cover rounded-[12px]"
                />
                {/* 삭제 버튼 */}
                <button
                  onClick={() =>
                    setImagePreviews((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="w-8 h-8 p-2.5 flex justify-center items-center absolute top-1 right-1 bg-[#E3E0F9]
                  rounded-full shadow-sm hover:bg-[#D7D4EC]"
                >
                  <div className="flex justify-center items-center w-[20px] h-[20px]">
                    <X />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
            onClick={handlePost}
          >
            <span>게시하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalkBox;
