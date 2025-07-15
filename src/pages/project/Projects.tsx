import ProjectFilterBar from '../../components/common/filter/ProjectFilterBar';
import ProjectList from '../../components/common/projects/ProjectList';

export const Projects = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full mt-[64px]">
                <ProjectFilterBar />

                <div className="max-w-[1440px] mx-[132px] mb-[27px]">
                    <ProjectList />
                    </div>
            </div>
        </div>
    );
};