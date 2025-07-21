import ic_avatar from '../../../assets/icons/ic_avatar.svg';
import { Heart } from 'lucide-react';
import ic_memberlocation from '../../../assets/icons/ic_memberlocation.svg';
import { useNavigate } from 'react-router-dom';
import type { MyInfoProps } from '../../../types/MyInfoProps';

// export type MemberCardProps = {
//     id: number;
//     name: string;
//     nickname: string;
//     gender: '남' | '여';
//     mbti: string;
//     location: string;
//     role: string;
//     skills: string[];
//     strengths: string[];
// };

const MemberCard = ({
    id,
    name,
    nickname,
    gender,
    mbti,
    location,
    role,
    skills,
    strengths,
}: MyInfoProps) => {

    const navigate = useNavigate();

    return (
        <div
            onClick={()=>navigate(`/members/${id}`)}
            className="flex flex-col justify-between w-full h-auto border border-[#CBC4CF] rounded-[8px]">
            {/* 프로필, 좋아요 아이콘 */}
            <div className="flex items-start justify-between p-4">
                <div className="flex items-center gap-2">
                <img src={ic_avatar} alt="avatar" className="w-10 h-10 rounded-full bg-[#E9DFF7]" />
                <div className="flex flex-col ml-[16px] gap-[4px]">
                    <div className="flex flex-wrap items-center gap-1"> {/* flex-wrap 추가 */}
                        <span className="title-medium">{name}</span>
                        <span className="title-medium">| {nickname}</span>
                        <span className="label-medium">({gender}) {mbti}</span>
                    </div>
                    <div className="flex items-center body-medium text-[#49454E] gap-[4.17px]">
                        <img src={ic_memberlocation} alt="위치 아이콘" />
                        {location}
                    </div>
                </div>
                </div>
                <Heart className="text-[#49454E] w-5 h-5 mt-[10.65px]" />
            </div>

            {/* 스킬과 강점 두 개씩만 */}
            <div className="w-full px-4 py-2 mb-3">
                {/* 역할 */}
                <p className="body-large">{role}</p>
                {[...(skills ?? []).slice(0, 2), ...(strengths ?? []).slice(0, 2)].map((tag, index) => (
                        <span
                            key={`${tag}-${index}`}
                            className="bg-[#FCF8FF] h-[28px] body-medium px-1 rounded-[4px]"
                        >
                            {tag}
                        </span>
                    ))}
            </div>
        </div>
    );
};

export default MemberCard;
