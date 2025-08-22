import { useEffect, useState } from 'react';
import MemberFilterBar from '../../components/common/filter/MemberFilterBar';
import MemberList from '../../components/common/memberpage/MemberList';
import { useMembers } from '../../hooks/useMember';
import ErrorPage from '../ErrorPage';
// import LoadingPage from '../LoadingPage';
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
                px-4 sm:px-8 md:px-16 xl:px-[180px]
                flex flex-col
                min-h-[calc(100vh-200px)]
            ">
                <MemberFilterBar 
                    onFiltersChange={handleFiltersChange}/>
                <div className="flex-1 flex flex-col">
                    {/* 멤버 리스트 영역 - 최소 높이 설정 */}
                    <div className="min-h-[848px]">
                        {isLoading ? <div>로딩중...</div>
                            : isError ? <ErrorPage />
                            : <MemberList members={members || []} />}
                    </div>
                    
                    {/* 페이지네이션을 항상 하단에 고정 */}
                    <div className="mt-auto">
                        <Pagination
                            page={page}
                            onPageChange={handlePageChange}
                            hasPrev={hasPrev}
                            hasNext={hasNext}
                        />
                    </div>
                </div>
                
            </div>
        </div>
    );
};