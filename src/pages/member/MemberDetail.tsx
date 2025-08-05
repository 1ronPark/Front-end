import MemberProfileCard from '../../components/common/memberpage/MemberProfileCard';
import MemberStrengths from '../../components/common/memberpage/MemberStrengths';
import MemberAwards from '../../components/common/memberpage/MemberAwards';
import MemberPortfolio from '../../components/common/memberpage/MemberPortfolio';
// import { useParams } from 'react-router-dom';
// import { useMemberDetail } from '../../hooks/useMember';

const MemberDetail = () => {
    // const { memberId } = useParams<{ memberId: string }>(); // string?????
    // const { data } = useMemberDetail(parseInt(memberId!)); // ????????

    // if (isLoading) return <LoadingSpinner />;

    // if (error) return 

    // if (!data?.result) return <p className="flex h-full items-center justify-center">존재하지 않는 팀원입니다</p>;

    // const memberData = data.result;

    return (
        <div className="bg-[#EEEEEE] min-h-screen py-[48px]">
            <div className="mx-auto flex flex-col gap-20 w-auto px-10 md:px-20 lg:px-40">
                <MemberProfileCard 
                    isApplicantToMyProject={true}/>
                <MemberStrengths />
                <MemberPortfolio />
                <MemberAwards />
            </div>
        </div>
    );
};

export default MemberDetail;