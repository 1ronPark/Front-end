import ic_avatar from '../../../assets/icons/ic_avatar.svg';
import { Heart } from 'lucide-react';
import ic_memberlocation from '../../../assets/icons/ic_memberlocation.svg';
import { useNavigate } from 'react-router-dom';

export type MemberCardProps = {
    id: number;
    name: string;
    nickname: string;
    gender: '남' | '여';
    mbti: string;
    location: string;
    role: string;
    tags: string[];
};

const MemberCard = ({
    id,
    name,
    nickname,
    gender,
    mbti,
    location,
    role,
    tags,
}: MemberCardProps) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={()=>navigate(`/members/${id}`)}
            className="w-full h-auto p-4 border border-[#CBC4CF] rounded-[8px]">
        {/* 프로필, 좋아요 아이콘 */}
        <div className="flex items-start justify-between">
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

        {/* 역할 */}
        <div className="mt-6 body-large">{role}</div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-1">
            {tags.map((tag) => (
            <span
                key={tag}
                className="bg-[#FEF7FF] body-medium px-1 rounded-[4px]"
            >
                {tag}
            </span>
            ))}
        </div>
        </div>
    );
};

export default MemberCard;
