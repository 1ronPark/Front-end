import FilterBar from '../components/common/filter/FilterBar';
export const Projects = () => {
    return (
      <>
        {/* 필터 영역: 최소 높이와 패딩으로 반응형 높이 구현 */}
        <div className="flex justify-center">
            <div className="w-full mt-[64px]">
                <FilterBar />
            </div>
        </div>
        <div>Projects</div>
      </>
    );
}