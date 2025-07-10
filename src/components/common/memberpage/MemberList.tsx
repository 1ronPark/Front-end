import MemberCard from "./MemberCard";
import { dummyMemberInfo } from "../../../../mockData/dummyMemberInfo";

const MemberList = () => {
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
                    tags={member.tags}
                />
            ))}
        </div>
    );
}

export default MemberList;