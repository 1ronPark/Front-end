import MemberProfileCard from '../../components/common/memberpage/MemberProfileCard';
import MemberStrengths from '../../components/common/memberpage/MemberStrengths';
import MemberAwards from '../../components/common/memberpage/MemberAwards';
import MemberPortfolio from '../../components/common/memberpage/MemberPortfolio';
import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';
import { useMemberDetail } from '../../hooks/useMember';
import { useParams } from 'react-router-dom';
// import { useMyProjects } from '../../hooks/useMyProjects';
import { useEffect, useState } from 'react';
import { useOfferedProject, useOfferProject } from '../../hooks/useProject';
import ActionStatusModal from '../../components/common/modals/ActionStatusModal';
// import MyProjectListBox from '../../components/common/filter/dropdowns/MyProjectListBox';

const MemberDetail = () => {
    const { memberId } = useParams<{ memberId: string }>(); // string???????????
    // const { data } = useMemberDetail(parseInt(memberId!)); // ????????
    const { data, isLoading, isError } = useMemberDetail(parseInt(memberId || ""));
    const { data: applyStatusData } = useOfferedProject();

    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedProject, setSelectedProject] = useState<{itemId: number; itemName: string} | null>(null);
    const [showProposalModal, setShowProposalModal] = useState(false);

    const [isProposalSent, setIsProposalSent] = useState(false);

    const offerProjectMutation = useOfferProject();

    useEffect(() => {
        if (applyStatusData?.result?.itemApplyStatuses) {
            const hasProposed = applyStatusData.result.itemApplyStatuses.some(status => 
                status.fromOwner === true &&
                status.itemOwned === true &&
                status.memberId === parseInt(memberId || "0")
            );
            setIsProposalSent(hasProposed);
        }
    }, [applyStatusData, memberId]);

    if (isLoading) return <LoadingPage />;
    if (isError || !data?.result) return <ErrorPage />;

    // if (!data?.result) return <p className="flex h-full items-center justify-center">존재하지 않는 팀원입니다</p>;

    const detail = data.result;

    const handleProjectSelect = (project: {itemId: number; itemName: string}) => {
        setSelectedProject(project);
        setShowDropdown(false);
        setShowProposalModal(true);
    }

    const handleProposalSent = () => {
        if (!selectedProject){
            alert('제안할 프로젝트가 없습니다.');
            return;
        }

        const requestData = {
            body: {
                itemId: selectedProject.itemId,
                memberId: detail.id
            }
        };

        offerProjectMutation.mutate(
            requestData,
            {
                onSuccess: () => {
                    setIsProposalSent(true);
                },
                onError: (error) => {
                    console.error('제안 보내기 실패:', error);
                }
            }
        );
    };

    return (
        <div className="bg-[#EEEEEE] min-h-screen py-[48px]">
            <div className="mx-auto flex flex-col gap-20 w-auto px-10 md:px-20 lg:px-40">
                <MemberProfileCard
                    memberData={detail}
                    isApplicantToMyProject={true}
                    suggested_project={isProposalSent}
                    onProposalClick={()=>setShowDropdown(true)}
                    showDropdown={showDropdown}
                    onProjectSelect={handleProjectSelect}
                    selectedProject={selectedProject}
                />
                <MemberStrengths 
                    skills={detail.skills}
                    strengths={detail.strengths}
                />
                <MemberPortfolio 
                    profileTitle={detail.profileTitle}
                    portfolios={detail.portfolios}
                />
                <MemberAwards 
                    activities={detail.activities} />
            </div>
            
            {showProposalModal && (
                <ActionStatusModal
                    proposalConfirmTitle={`${detail.name}님께\n제안을\n보낼까요?`}
                    proposalConfirmButtonText="보내기"
                    proposalSentTitle={`${detail.name}님께\n제안을\n보냈어요`}
                    proposalSentButtonText="확인"
                    onClose={()=>setShowProposalModal(false)}
                    onProposalSent={handleProposalSent}
                    selectedProject={selectedProject}
                />
            )}
        </div>
    );
};

export default MemberDetail;