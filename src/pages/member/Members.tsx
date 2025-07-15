import MemberFilterBar from '../../components/common/filter/MemberFilterBar';
import MemberList from '../../components/common/memberpage/MemberList';

export const Members = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full mt-[64px] max-w-[1440px] px-[132px] mb-[27px]">
              <MemberFilterBar />
              <MemberList />
            </div>
        </div>
    );
};