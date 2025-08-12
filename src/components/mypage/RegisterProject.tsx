import { useState, useEffect, useRef } from 'react';
import Header from '../../components/mypage/project/register/Header';
import ProjectMenu from '../../components/mypage/project/register/ProjectMenu';
import Save from '../../components/mypage/project/register/Save';
import Detail from './project/register/Detail';
import Recruit from './project/register/Recruit';

const SECTIONS = [
  { id: 'basic-info', component: <Header /> },
  { id: 'project-detail', component: <Detail /> },
  { id: 'recruitment', component: <Recruit /> },
];
{/*{ id: 'reception-status', component: <Reception /> },*/}
export const RegisterProject = () => {
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
