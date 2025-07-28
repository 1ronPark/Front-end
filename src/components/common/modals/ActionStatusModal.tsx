// 프로젝트/팀원 상세 페이지 -> 제안할 때 뜨는 공통 모달

import { useState } from "react";
import ic_sendresume from '../../../assets/icons/ic_sendresume.svg';

type ActionStatusModalProps = {
    // 제안/지원 확인 메시지 - '00님께 제안을 보낼까요?'
    proposalConfirmTitle: string;
    proposalConfirmButtonText: string;

    // 제안/지원 완료 메시지 - '00님께 제안을 보냈어요'
    proposalSentTitle: string;
    proposalSentButtonText: string; // '확인'으로 동일하긴 하지만 혹시 몰라서 추가했습니다

    onClose: () => void;

    // 제안 보낸 후의 콜백 (제안 보내기 버튼 변화용)
    onProposalSent?: () => void;
};

const ActionStatusModal = ({
    proposalConfirmTitle,
    proposalConfirmButtonText,
    proposalSentTitle,
    proposalSentButtonText,
    onClose,
    onProposalSent,
}: ActionStatusModalProps) => {
    const [step, setStep] = useState<'confirm' | 'sent'>('confirm');

    const handleProposalSent = () => {
        // "확인" 버튼 클릭 시
        onProposalSent?.(); // 각자의 상세 페이지로 상태 변경 신호 전달
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 top-[56px] right-[65px] flex items-center justify-center bg-black/50 backdrop-blur-sm text-center">
            <div className="bg-[#F5F5F7] rounded-[28px] px-12 py-8 w-[384px] shadow-xl"
                style={{
                    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.16)'
                }}
            >
                {step === 'confirm' ? (
                    <>
                        <h2 className="headline-large-emphasis mb-16 whitespace-pre-line">{proposalConfirmTitle}</h2>
                        <button
                            onClick={() => setStep('sent')}
                            className="w-full py-4 rounded-[16px] bg-[#5A5891] text-white title-medium-emphasis"
                        >
                            {proposalConfirmButtonText}
                        </button>
                        <button
                            onClick={onClose}
                            className="mt-[18px] label-large text-[#5A5891]"
                        >
                            닫기
                        </button>
                    </>
                ) : (
                    <>
                        <img src={ic_sendresume} alt="완료" className="mx-auto mb-4" />
                        <h2 className="headline-large-emphasis mb-[80px] whitespace-pre-line">{proposalSentTitle}</h2>
                        <button
                            onClick={handleProposalSent}
                            className="w-full py-4 rounded-[16px] bg-[#5A5891] text-white title-medium-emphasis"
                        >
                            {proposalSentButtonText}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ActionStatusModal;