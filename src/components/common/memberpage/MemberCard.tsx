import ic_avatar from '../../../assets/icons/ic_avatar.svg';
import { Heart } from 'lucide-react';
import ic_memberlocation from '../../../assets/icons/ic_memberlocation.svg';

const MemberCard = () => {
    return (
        <div className="w-[348px] h-auto p-4 border border-[#CBC4CF] rounded-[8px]">
        {/* 프로필, 좋아요 아이콘 */}
        <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
            <img src={ic_avatar} alt="avatar" className="w-10 h-10 rounded-full bg-[#E9DFF7]" />
            <div className="flex flex-col ml-[16px] gap-[4px]">
                <div className="flex items-center gap-1">
                <span className="title-medium">강 00</span>
                <span className="title-medium">| 히로로</span>
                <span className="label-medium">(남) ISFJ</span>
                </div>
                <div className="flex items-center body-medium text-[#49454E] gap-[4.17px]">
                    <img src={ic_memberlocation} alt="위치 아이콘" />
                    서울 전체, 경기도 성남
                </div>
            </div>
            </div>
            <Heart className="text-[#49454E] w-5 h-5 mt-[10.65px]" />
        </div>

        {/* 내용 */}
        <div className="mt-6 body-large">백엔드 개발</div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-1">
            {['#spring', '#node.js', '#CSS', '#빅데이터분석기사'].map((tag) => (
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
