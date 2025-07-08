import FilterBar from '../components/common/filter/FilterBar';
import MemberCard from '../components/common/memberpage/MemberCard';

export const Members = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full mt-[64px]">
                <FilterBar />

                <MemberCard />
            </div>
        </div>
    );
};