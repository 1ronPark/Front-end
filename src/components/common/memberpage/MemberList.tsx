import MemberCard from "./MemberCard";
// import { dummyMemberInfo } from "../../../../mockData/dummyMemberInfo";
import type { MemberListItem } from "../../../types/MemberProps";
import { formatRegions } from "../../../utils/formatRegions";

interface MemberListProps {
    members: MemberListItem[];
};

const MemberList: React.FC<MemberListProps> = ({ members }) => {
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 w-fit min-h-[688px] overflow-y-auto">
            {members.map((member) => (
                <MemberCard
                    id={member.id}
                    name={member.name}
                    nickname={member.nickname}
                    gender={member.gender}
                    mbti={member.mbti}
                    location={formatRegions(member.regions)}
                    role={member.positions.length > 0 
                        ? member.positions.join(', ') 
                        : '역할 정보 없음'
                    }       
                    skills={member.skills}
                    strengths={member.strengths}  
                />
            ))}
            {members.length === 0 && (
                <p className="text-center">선택된 역할에 해당하는 멤버가 없습니다.</p>
            )}
        </div>
    );
}

export default MemberList;