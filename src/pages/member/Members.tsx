import { useState } from 'react';
import MemberFilterBar from '../../components/common/filter/MemberFilterBar';
import MemberList from '../../components/common/memberpage/MemberList';
import { useMembers } from '../../hooks/useMember';
import ErrorPage from '../ErrorPage';
import LoadingPage from '../LoadingPage';
import type { MemberFiltersParams } from '../../types/MemberProps';

export const Members = () => {
    const [filters, setFilters] = useState<MemberFiltersParams>({
        page: 1,
        limit: 20
    });

    const { data, isLoading, isError } = useMembers(filters);

     // 디버깅 로그 추가
    console.log('API Response:', data);
    console.log('Members array:', data?.result.members);
    console.log('Is loading:', isLoading);
    console.log('Is error:', isError);

    const handleFiltersChange = (newFilters: MemberFiltersParams) => {
        setFilters(newFilters);
    };

    return (
        <div className="flex justify-center">
            <div className="
                w-full mt-12 mb-7 overflow-visible
                max-w-[1440px]
                px-4 sm:px-8 md:px-16 xl:px-[130px]
            ">
                <MemberFilterBar 
                    onFiltersChange={handleFiltersChange}/>
                {isLoading ? <LoadingPage />
                    : isError ? <ErrorPage />
                    : <MemberList members={data?.result.members || []} />}
            </div>
        </div>
    );
};