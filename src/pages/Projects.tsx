import FilterBar from '../components/common/filter/FilterBar';
import ProjectList from '../components/common/projects/ProjectList';

export const Projects = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full mt-[64px]">
                <FilterBar />

                <div className="max-w-[1440px] mx-[132px] mb-[27px]">
                    <ProjectList />
                    </div>
            </div>
        </div>
    );
};