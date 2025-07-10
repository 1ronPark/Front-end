import FilterBar from '../../components/common/filter/FilterBar';
import MemberList from '../../components/common/memberpage/MemberList';

export const Members = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full mt-[64px]">
                <FilterBar />

                <div className="max-w-[1440px] mx-[132px] mb-[27px]">
                    <MemberList />
                </div>
                
            </div>
        </div>
    );
};