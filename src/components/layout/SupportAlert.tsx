import { useNavigate } from "react-router-dom";
import ic_issuported from "../../assets/icons/ic_issupported.svg";

type SupportAlertProps = {
    isVisible: boolean;
    onClose: ()=>void;
};

const SupportAlert = ({ isVisible, onClose }:SupportAlertProps) => {
    const navigate = useNavigate();

    const handleGoToApplicants = () => {
        navigate("/notification"); // 지원자 목록으로 가는 경로 만들어야 함!!
        onClose();
    };

    if (!isVisible) return null;

    return (
        <div className="absolute inset-0 right-[60px] z-50 flex flex-col items-center justify-center text-center backdrop-blur-lg">
            <img src={ic_issuported} alt="알림" />
                <h2 className="headline-large-emphasis py-4">새롭게 지원한 분이 있어요</h2>
                <p className="body-large-emphasis">지원자를 확인하고 연락해볼까요?</p>
                <p className="body-medium-emphasis mt-2">모든 지원내역은 알림에서 볼 수 있어요</p>
                <button
                    onClick={handleGoToApplicants}
                    className="flex justify-center w-[288px] mt-20 py-4 title-medium-emphasis rounded-2xl bg-[#5A5891] text-white"
                >
                    지원자 보러가기
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

export default SupportAlert;