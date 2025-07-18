import MemberProfileCard from '../../components/common/memberpage/MemberProfileCard';
import MemberStrengths from '../../components/common/memberpage/MemberStrengths';
import MemberAwards from '../../components/common/memberpage/MemberAwards';
import MemberPortfolio from '../../components/common/memberpage/MemberPortfolio';

const MemberDetail = () => {
  // 추후 API 연결 시 useQuery 등으로 데이터 패칭
  // const { data, isLoading } = useMemberDetailQuery(memberId);

    return (
        <div className="bg-[#EEEEEE] min-h-screen py-[48px]">
            <div className="mx-auto flex flex-col gap-20 w-auto px-10 md:px-20 lg:px-40">
                <MemberProfileCard isApplicantToMyProject={true}/>
                <MemberStrengths />
                <MemberPortfolio />
                <MemberAwards />
            </div>
        </div>
    );
};

export default MemberDetail;