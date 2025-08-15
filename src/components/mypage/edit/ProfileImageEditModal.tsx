// AddPhotoModal.tsx
import { useRef, useState } from "react";
import { X } from "lucide-react";

interface ProfileImageEditModalProps {
  onClose: () => void;
  /** 적용 버튼을 눌렀을 때 선택한 파일을 부모에게 전달 */
  onPick: (file: File) => void;
  maxSizeMB?: number;
  accept?: string; // e.g. "image/*"
}

const ProfileImageEditModal = ({
  onClose,
  onPick,
  maxSizeMB = 4,
  accept = "image/*",
}: ProfileImageEditModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const openPicker = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErr(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setErr(`파일이 너무 큽니다. 최대 ${maxSizeMB}MB까지 업로드 가능합니다.`);
      e.target.value = "";
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErr("이미지 파일만 업로드할 수 있습니다.");
      e.target.value = "";
      return;
    }

    setFileName(file.name);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // 로컬 미리보기
  };

  const handleApply = () => {
    if (!selectedFile) {
      setErr("이미지를 선택해 주세요.");
      return;
    }
    onPick(selectedFile); // ← 파일만 부모로 전달
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className="relative z-10 w-[520px] bg-[#FFF] flex flex-col py-8 rounded-xl gap-6 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-8">
          <p className="headline-small-emphasis">프로필 사진 등록</p>
          <button onClick={onClose}>
            <X className="w-[32px] h-[32px]" />
          </button>
        </div>

        <div className="px-8 flex flex-col gap-3">
          <div className="w-full h-[56px] flex items-center gap-4">
            <input
              type="text"
              disabled
              value={fileName || ""}
              placeholder={`등록할 사진을 찾아주세요. (최대 ${maxSizeMB}MB)`}
              className="h-full flex-1 pl-4 py-1 rounded-xl bg-gray-100"
            />
            <button
              onClick={openPicker}
              className="w-[123px] h-[56px] rounded-xl bg-[#F2ECF4] hover:bg-[#D8CEF0]"
            >
              <p className="title-medium text-[#49454E]">파일 선택</p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-[160px] h-[160px] rounded-lg object-cover border border-[#E0E0E0]"
            />
          )}
          {err && <p className="body-small text-red-500">{err}</p>}
        </div>

        <div className="px-8 flex justify-end">
          <button
            onClick={handleApply}
            disabled={!selectedFile}
            className={`w-[123px] h-[56px] rounded-xl title-medium text-white hover:cursor-pointer
              ${
                !selectedFile
                  ? "bg-[#C7BBD9] cursor-not-allowed"
                  : "bg-[#68548E]"
              }
            `}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageEditModal;
