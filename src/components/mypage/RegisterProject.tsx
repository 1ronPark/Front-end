import { useState, useEffect, useRef } from 'react';
import Header from '../../components/mypage/project/register/Header';
import ProjectMenu from '../../components/mypage/project/register/ProjectMenu';
import Save from '../../components/mypage/project/register/Save';
import Detail from './project/register/Detail';
import Recruit from './project/register/Recruit';
import type { RecruitPosition } from "../../hooks/useMakeItem";
import { useParams } from "react-router-dom";

export const RegisterProject = () => {
  const [name, setName] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [itemProfileImage, setItemProfileImage] = useState<File | null>(null);
  const [itemCategories, setItemCategories] = useState<{ itemCategory: string }[]>([]);
  const { projectId } = useParams();
  const mode = projectId ? "edit" : "register"; 

  const handleHeaderChange = (
    field: string,
    value: string | File | { itemCategory: string }[]
  ) => {
    switch (field) {
      case 'name':
        setName(value as string);
        break;
      case 'introduce':
        setIntroduce(value as string);
        break;
      case 'itemProfileImage':
        setItemProfileImage(value as File);
        break;
      case 'itemCategories':
        setItemCategories(value as { itemCategory: string }[]);
        break;
    }
  };

  const [projectStatus, setProjectStatus] = useState<boolean>(false);
  const [collaborationRegions, setCollaborationRegions] = useState<{ siDo: string; siGunGu: string }[]>([]);
  const [recruitPositions, setRecruitPositions] = useState<RecruitPosition[]>([]);

 const handleRecruitChange = <T extends 'projectStatus' | 'collaborationRegions' | 'recruitPositions'>(
  field: T,
  value: T extends 'projectStatus'
    ? boolean
    : T extends 'collaborationRegions'
    ? { siDo: string; siGunGu: string }[]
    : RecruitPosition[]
  ) => {
    switch (field) {
      case 'projectStatus':
        setProjectStatus(value as boolean);
        break;
      case 'collaborationRegions':
        setCollaborationRegions(value as { siDo: string; siGunGu: string }[]);
        break;
      case 'recruitPositions':
        setRecruitPositions(value as RecruitPosition[]);
        break;
    }
  };

  const SECTIONS = [
    { id: 'basic-info', component: <Header
      mode={mode}
      name={name}
      introduce={introduce}
      itemProfileImage={itemProfileImage}
      itemCategories={itemCategories}
      onChange={handleHeaderChange}
    /> },
    { id: 'project-detail', component: <Detail /> },
    {
      id: 'recruitment',
      component: (
        <Recruit
          projectStatus={projectStatus}
          collaborationRegions={collaborationRegions}
          recruitPositions={recruitPositions}
          setField={handleRecruitChange}
        />
      )
    },
  ];
  {/*{ id: 'reception-status', component: <Reception /> },*/}

  const [activeSection, setActiveSection] = useState('basic-info');
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    const refsSnapshot = [...sectionRefs.current];

    refsSnapshot.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refsSnapshot.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="flex w-full max-w-[1024px] px-6 py-8">
        <div className="flex-1 space-y-20">
          {SECTIONS.map((section, index) => (
            <div 
            key={section.id} 
            id={section.id} 
            ref={(el) => { 
              sectionRefs.current[index] = el; 
              }}
              className="min-h-[200px]"
              >
              {section.component}
            </div>
          ))}
          <Save />
        </div>
        <div className="sticky top-8 ml-8 w-64 flex-shrink-0 self-start">
          <ProjectMenu activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
};
