// AddPhotoModal.tsx
import { useRef, useState } from "react";
import { X } from "lucide-react";

interface AddPhotoProps {
  onClose: () => void;
  /** 적용 버튼을 눌렀을 때 업로드를 수행할 함수(부모에서 구현) */
  onUpload: (file: File) => Promise<void> | void;
  maxSizeMB?: number;
  accept?: string; // e.g. "image/*"
}

const AddPhotoModal = ({
  onClose,
  onUpload,
  maxSizeMB = 4,
  accept = "image/*",
}: AddPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const openPicker = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErr(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // 용량/타입 체크
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

  const handleApply = async () => {
    if (!selectedFile) {
      setErr("이미지를 선택해 주세요.");
      return;
    }
    try {
      setIsUploading(true);
      await onUpload(selectedFile); // 부모에서 업로드 수행 (multipart)
      onClose(); // 성공 시 모달 닫기
    } catch {
      setErr("업로드 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/10 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className="relative z-10 w-[520px] h-auto bg-[#FFF] flex flex-col py-8 rounded-xl gap-6 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center px-8">
          <p className="headline-small-emphasis">프로필 사진 등록</p>
          <button
            onClick={onClose}
            className="flex justify-center items-center hover:cursor-pointer"
          >
            <X className="w-[32px] h-[32px]" />
          </button>
        </div>

        {/* 파일 선택 */}
        <div className="px-8 flex flex-col gap-3">
          <div className="w-full h-[56px] flex items-center gap-4">
            <input
              type="text"
              disabled
              value={fileName || ""}
              placeholder={`등록할 사진을 찾아주세요. (최대 ${maxSizeMB}MB)`}
              className="h-full flex flex-1 items-start gap-1 pl-4 py-1 rounded-xl bg-gray-100"
            />
            <button
              onClick={openPicker}
              className="w-[123px] h-[56px] flex justify-center items-center rounded-xl bg-[#F2ECF4] hover:bg-[#D8CEF0] cursor-pointer"
            >
              <p className="flex justify-center items-center gap-2 py-4 px-6 title-medium text-[#49454E]">
                파일 선택
              </p>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* 미리보기 / 상태 */}
          {preview && (
            <div className="w-full">
              <img
                src={preview}
                alt="preview"
                className="w-[160px] h-[160px] rounded-lg object-cover border border-[#E0E0E0]"
              />
            </div>
          )}
          {err && <p className="body-small text-red-500">{err}</p>}
        </div>

        {/* 적용 */}
        <div className="w-[520px] h-[56px] px-8 flex justify-end items-center gap-3">
          <button
            onClick={handleApply}
            disabled={!selectedFile || isUploading}
            className={`w-[123px] h-[56px] flex justify-center items-center rounded-xl title-medium text-[#FFF] hover:cursor-pointer
              ${
                !selectedFile || isUploading
                  ? "bg-[#C7BBD9] cursor-not-allowed"
                  : "bg-[#68548E]"
              }`}
          >
            {isUploading ? "업로드 중…" : "적용"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPhotoModal;
