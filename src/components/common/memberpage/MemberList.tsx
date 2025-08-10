import MemberCard from "./MemberCard";
import { dummyMemberInfo } from "../../../../mockData/dummyMemberInfo";
// import { useMemo } from "react";


// interface MemberListProps {
//     selectedFilters: string[];
// };


const MemberList: React.FC = () => {
    
    // const filteredMembers = useMemo(()=>{
    //     // 선택 필터 없거나 '전체' 선택한 경우 모든 멤버 반환
    //     if (selectedFilters.length == 0 || selectedFilters.includes('전체')){
    //         return dummyMemberInfo;
    //     }

    //     return dummyMemberInfo.filter(member =>
    //         selectedFilters.includes(member.role)
    //     );
    // }, [selectedFilters]);
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-fit min-h-[688px] overflow-y-auto">
            {dummyMemberInfo.map((member, index) => (
                <MemberCard
                    key={`member-${index}`}
                    id={member.id}
                    name={member.name}
                    nickname={member.nickname}
                    gender={member.gender}
                    mbti={member.mbti}
                    location={member.location}
                    role={member.role}
                    skills={member.skills}
                    strengths={member.strengths}  
                />
            ))}
            {dummyMemberInfo.length === 0 && (
                <p className="text-center">선택된 역할에 해당하는 멤버가 없습니다.</p>
            )}
        </div>
    );
}

export default MemberList;