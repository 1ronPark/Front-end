import MemberProfileCard from '../../components/common/memberpage/MemberProfileCard';
import MemberStrengths from '../../components/common/memberpage/MemberStrengths';
import MemberAwards from '../../components/common/memberpage/MemberAwards';
import MemberPortfolio from '../../components/common/memberpage/MemberPortfolio';
import LoadingPage from '../LoadingPage';
import ErrorPage from '../ErrorPage';
import { useMemberDetail } from '../../hooks/useMember';
import { useParams } from 'react-router-dom';

const MemberDetail = () => {
    const { memberId } = useParams<{ memberId: string }>(); // string???????????
    // const { data } = useMemberDetail(parseInt(memberId!)); // ????????
    const { data, isLoading, isError } = useMemberDetail(parseInt(memberId || ""));

    if (isLoading) return <LoadingPage />;
    if (isError || !data?.result) return <ErrorPage />;

    // if (!data?.result) return <p className="flex h-full items-center justify-center">존재하지 않는 팀원입니다</p>;

    const detail = data.result;

    return (
        <div className="bg-[#EEEEEE] min-h-screen py-[48px]">
            <div className="mx-auto flex flex-col gap-20 w-auto px-10 md:px-20 lg:px-40">
                <MemberProfileCard
                    memberData={detail}
                    isApplicantToMyProject={true}
                    suggested_project={false} 
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
        </div>
    );
};

export default MemberDetail;