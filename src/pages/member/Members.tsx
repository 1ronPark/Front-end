import { useEffect, useState } from 'react';
import MemberFilterBar from '../../components/common/filter/MemberFilterBar';
import MemberList from '../../components/common/memberpage/MemberList';
import { useMembers } from '../../hooks/useMember';
import ErrorPage from '../ErrorPage';
import LoadingPage from '../LoadingPage';
import type { MemberFiltersParams } from '../../types/MemberProps';
import Pagination from '../../components/common/pagination/Pagination';

export const Members = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<MemberFiltersParams>({
        page: 1,
        limit: 16
    });
    const { data, isLoading, isError } = useMembers(filters);

    const members = data?.result?.members ?? [];
    const totalResults = data?.result?.numOfTotalResults ?? 0;

    const PAGE_SIZE = 16;
    const hasPrev = page > 1;
    const hasNext = page * PAGE_SIZE < totalResults;

     // 디버깅 로그 추가
    // console.log('API Response:', data);
    // console.log('Members array:', data?.result.members);
    // console.log('Is loading:', isLoading);
    // console.log('Is error:', isError);

    useEffect(() => {
        console.log('Page changed to:', page);
        setFilters(prev => ({
            ...prev,
            page: page
        }));
    }, [page]);

    const handleFiltersChange = (newFilters: MemberFiltersParams) => {
        console.log('Filters changed:', newFilters);
        setFilters(newFilters);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        console.log('Page change requested:', newPage);
        setPage(newPage);
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
                    : <MemberList members={members || []} />}
                <Pagination
                    page={page}
                    onPageChange={handlePageChange}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
                />
            </div>
        </div>
    );
};