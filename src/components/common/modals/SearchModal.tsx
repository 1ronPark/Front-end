import { X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { dummyMemberInfo } from "../../../../mockData/dummyMemberInfo";
import { dummyProjectInfo } from "../../../../mockData/dummyProjectCard";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { useInfiniteQuery } from '@tanstack/react-query'
import { buildMemberParams } from "../../../utils/buildMemberParams";
// import { useMembers } from "../../../hooks/useMember";
// import type { MemberFiltersParams } from "../../../types/MemberProps";

export type SearchModalProps = {
  onClose: () => void;
};

type UnifiedItem = {
  id: number;
  name: string;
  description: string;
  source: "member" | "project";
};

const SearchModal = ({ onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const navigate = useNavigate();

  // 검색 필터 생성
  // const searchFilters: MemberFiltersParams = debouncedQuery ? {
  //   mbtiE: debouncedQuery.toLowerCase().includes('e'),
  //   mbtiN: debouncedQuery.toLowerCase().includes('n'),
  //   mbtiF: debouncedQuery.toLowerCase().includes('f'),
  //   mbtiP: debouncedQuery.toLowerCase().includes('p'),
  //   positions: debouncedQuery,
  //   page: 1,
  //   limit: 20,
  // } : {
  //   // 검색어 없으면 전체 조회
  //   page: 1,
  //   limit: 20,
  // }

  // 필터 정리
  // const cleanedParams = buildMemberParams(searchFilters);

  // const { data, isLoading, isError } = useMembers(searchFilters);

  // 프로젝트/멤버 데이터 통합
  const unifiedData: UnifiedItem[] = [
    ...dummyMemberInfo.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.role,
      source: "member" as const,
    })),
    ...dummyProjectInfo.map((item) => ({
      id: item.id,
      name: item.title,
      description: item.title,
      source: "project" as const,
    })),
  ];

  // 필터링
  const filteredResults = unifiedData.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[500px] rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center px-4 py-3 border-b">
          <ArrowLeft
            className="w-5 h-5 mr-2 cursor-pointer"
            onClick={onClose}
          />
          <input
            type="text"
            value={query}
            placeholder="Input text"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none bg-transparent text-base"
          />
          <X className="w-5 h-5 ml-2 cursor-pointer" onClick={onClose} />
        </div>

        {/* 아이템들 */}
        <div className="divide-y">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={`${item.source}-${item.id}`}
                className="flex items-center px-4 py-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onClose();
                  navigate(
                    item.source === "member"
                      ? `/members/${item.id}`
                      : `/projects/${item.id}`
                  );
                }}
              >
                {/* avatar */}
                <div className="w-10 h-10 rounded-full bg-[#E7E4FF] flex items-center justify-center text-[#2E2C4F] font-medium mr-4">
                  {item.name.charAt(0)}
                </div>

                {/* 내용 */}
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {item.description}
                  </div>
                </div>

                {/* 태그 */}
                <div className="text-xs font-medium text-white bg-[#7C75D1] px-2 py-1 rounded-lg ml-2">
                  {item.source === "member" ? "팀원" : "프로젝트"}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-gray-400 text-sm">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
