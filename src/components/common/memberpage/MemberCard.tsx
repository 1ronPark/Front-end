import ic_avatar from '../../../assets/icons/ic_avatar.svg';
import { Heart } from 'lucide-react';
import ic_memberlocation from '../../../assets/icons/ic_memberlocation.svg';
import { useNavigate } from 'react-router-dom';
import type { MyInfoProps } from '../../../types/MyInfoProps';
import { useEffect, useState } from 'react';
import { useLikeMember, useUnLikeMember } from '../../../hooks/useMember';

type MemberCardProps = Pick<
    MyInfoProps,
    "id" | "name" | "nickname" | "gender" | "mbti" | "location" | "role" | "skills" | "strengths"
> & {
    liked?: boolean;
};

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
    liked=false,
}: MemberCardProps) => {

    const [isLiked, setIsLiked] = useState(liked);

    const likeMutation = useLikeMember(id);
    const unlikeMutation = useUnLikeMember(id);

    const navigate = useNavigate();

    useEffect(()=>setIsLiked(!!liked), [liked]);

    const onHeartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLiked) {
            unlikeMutation.mutate({}, {
                onSuccess: () => setIsLiked(false),
                onError: () => setIsLiked(true),
            });
        } else {
            likeMutation.mutate({}, {
                onSuccess: () => setIsLiked(true),
                onError: () => setIsLiked(false),
            });
        }
    }

    return (
        <div
            onClick={()=>navigate(`/members/${id}`)}
            className="
                flex flex-col justify-between w-full h-[200px] overflow-hidden
                border border-[#C8C5D0] rounded-[8px]
                hover:bg-[#1D1B20]/8 hover:shadow-[0_1px_3px_1px_rgba(0,0,0,0.15),0_1px_2px_1px_rgba(0,0,0,0.30)]
                active:bg-[#1D1B20]/10 active:shadow-none
                transition-all duration-150 cursor-pointer
            ">  
            {/* 프로필, 좋아요 아이콘 */}
            <div className="flex items-start justify-between p-4">
                <div className="flex items-center gap-2">
                <img src={ic_avatar} alt="avatar" className="w-10 h-10 rounded-full bg-[#E9DFF7]" />
                <div className="flex flex-col ml-[16px] gap-[4px]">
                    <div className="flex flex-wrap items-center gap-1"> {/* flex-wrap 추가 */}
                        <span className="title-medium">{name}</span>
                        <span className="title-medium">| {nickname}</span>
                        <span className="label-medium">({gender ? '남' : '여'}) {mbti}</span>
                    </div>
                    <div className="flex items-center body-medium text-[#47464F]/58 gap-[4.17px]">
                        <img 
                            src={ic_memberlocation} 
                            alt="위치 아이콘" 
                            style={{ 
                                filter: 'brightness(0) opacity(0.58)',
                                color: '#47464F'
                            }}
                        />
                        {location}
                    </div>
                </div>
                </div>
                <button
                    onClick={onHeartClick}
                    aria-label={isLiked ? '관심 해제' : '관심 추가'}
                    className="p-1 mt-[10.65px] cursor-pointer transition-colors duration-150"
                >
                    {isLiked ? (
                    // filled
                    <Heart className="w-5 h-5  " fill="currentColor" stroke="currentColor" />
                ) : (
                    // outline
                    <Heart className="w-5 h-5 " />
                )}    
                </button>
            </div>

            {/* 스킬과 강점 두 개씩만 */}
            <div className="w-full px-4 py-2 mb-3">
                {/* 역할 */}
                <p className="body-medium">{role}</p>
                <div className="flex flex-wrap gap-[10px]">
                    {[...(skills ?? []).slice(0, 2), ...(strengths ?? []).slice(0, 2)].map((tag, index) => (
                        <span
                            key={`${tag}-${index}`}
                            className="flex items-center justify-center bg-[#FCF8FF] body-small p-1 rounded-[4px]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MemberCard;
