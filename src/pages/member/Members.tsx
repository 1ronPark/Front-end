// import { useState } from 'react';
import MemberFilterBar from '../../components/common/filter/MemberFilterBar';
import MemberList from '../../components/common/memberpage/MemberList';

export const Members = () => {
    // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    // const handleChipSelection = (chips: string[]) => {
    //     setSelectedFilters(chips);
    // };

    return (
        <div className="flex justify-center">
            <div className="
                w-full mt-12 mb-7 overflow-visible
                max-w-[1440px]
                px-4 sm:px-8 md:px-16 xl:px-[130px]
            ">
                <MemberFilterBar />
                <MemberList />
            </div>
        </div>
    );
};