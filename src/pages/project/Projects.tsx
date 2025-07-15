import ProjectFilterBar from '../../components/common/filter/ProjectFilterBar';
import ProjectList from '../../components/common/projects/ProjectList';

export const Projects = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full mt-[30px] max-w-[1440px] px-[132px] mb-[27px]">
              <ProjectFilterBar />
              <ProjectList />
            </div>
        </div>
    );
};