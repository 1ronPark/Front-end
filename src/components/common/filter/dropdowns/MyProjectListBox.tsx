// 팀원 상세 페이지에서 제안할 프로젝트가 나오는 드롭다운

import { useState } from 'react';

import ic_keyboard_arrow_down from "../../../../assets/icons/ic_keyboard_arrow_down.svg";
import ic_keyboard_arrow_up from "../../../../assets/icons/ic_keyboard_arrow_up.svg";
import { useMyProjects } from '../../../../hooks/useMyProjects';

interface MyProjectListBoxProps {
    onProjectSelect: (project: { itemId: number; itemName: string }) => void;
    selectedProjectId?: number;
}

const MyProjectListBox = ({ onProjectSelect, selectedProjectId }: MyProjectListBoxProps) => {
    const { createdProjects, isLoading } = useMyProjects();
    const [isOpen, setIsOpen] = useState(false);

    const selectedProject = createdProjects.find(project => project.itemId === selectedProjectId);
    const displayText = selectedProject ? selectedProject.itemName : '프로젝트를 선택하세요';

    const handleProjectSelect = (project: { itemId: number; itemName: string }) => {
        onProjectSelect(project);
        setIsOpen(false);
    };

    if (isLoading) {
        return (
        <div className="relative">
            <div className="w-full h-[48px] bg-[#2A2A2A] rounded-[8px] flex items-center justify-between px-4 cursor-not-allowed opacity-60">
            <span className="text-white text-sm">불러오는 중...</span>
            </div>
        </div>
        );
    }

    return (
        <div className="relative">
        {/* 드롭다운 헤더 */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-[48px] rounded-[8px] bg-white flex items-center justify-between px-4 hover:bg-[#3A3A3A] transition-colors"
        >
            <span className="text-black text-sm font-medium truncate">
                {displayText}
            </span>
            <img 
                src={isOpen ? ic_keyboard_arrow_up : ic_keyboard_arrow_down} 
                alt="dropdown arrow" 
                className="w-5 h-5"
            />
        </button>

        {/* 드롭다운 리스트 */}
        {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[8px] shadow-lg z-50 max-h-[200px] overflow-y-auto">
            {createdProjects.length === 0 ? (
                <div className="px-4 py-3 text-gray-400 text-sm">
                생성한 프로젝트가 없습니다.
                </div>
            ) : (
                createdProjects.map((project) => (
                <button
                    key={project.itemId}
                    onClick={() => handleProjectSelect({ itemId: project.itemId, itemName: project.itemName })}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-[#3A3A3A] transition-colors ${
                    selectedProjectId === project.itemId 
                        ? 'text-[#5A5891]' 
                        : 'text-black'
                    }`}
                >
                    {project.itemName}
                </button>
                ))
            )}
            </div>
        )}

        {/* 드롭다운 외부 클릭 시 닫기 */}
        {isOpen && (
            <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
            />
        )}
        </div>
    );
};

export default MyProjectListBox;