// 프로젝트/팀원 페이지에서 제안/지원 받은 사용자가 진입 시의 공통 모달 컴포넌트

import { useNavigate } from "react-router-dom";

type AlertModalProps = {
    // 아이콘 관련
    icon: string;
    iconAlt?: string;
    
    // 텍스트 관련
    title: string;
    content: string;
    subcontent: string;
    
    // 버튼 관련
    primaryButtonText: string;
    primaryButtonAction?: () => void;
    primaryButtonPath?: string; // 네비게이션 경로
    
    // 모달 제어
    isVisible: boolean;
    onClose: () => void;
};

const AlertModal = ({
    icon,
    iconAlt = "알림",
    title,
    content,
    subcontent,
    primaryButtonText,
    primaryButtonAction,
    primaryButtonPath,
    isVisible,
    onClose,
}: AlertModalProps) => {
    const navigate = useNavigate();

    const handlePrimaryAction = () => {
        if (primaryButtonAction) {
            primaryButtonAction();
        } else if (primaryButtonPath) {
            navigate(primaryButtonPath);
        }
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 top-[56px] right-[65px] z-50 flex flex-col items-center justify-center text-center backdrop-blur-lg">
            {/* 아이콘 */}
            <img src={icon} alt={iconAlt} />

            {/* 텍스트들 */}
            <h2 className="headline-large-emphasis py-4">{title}</h2>
            <p className="body-large-emphasis">{content}</p>
            <p className="body-medium-emphasis mt-2">{subcontent}</p>

            {/* 주요 메인 버튼 (보라색) */}
            <button
                onClick={handlePrimaryAction}
                className="flex justify-center w-[288px] mt-20 py-4 title-medium-emphasis rounded-2xl bg-[#5A5891] text-white"
            >
                {primaryButtonText}
            </button>
            <button
                onClick={onClose}
                className="label-large mt-[18px] text-[#5A5891]"
            >
                닫기
            </button>`
        </div>
    );
};

export default AlertModal;