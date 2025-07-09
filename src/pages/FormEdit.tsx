import { useState, useEffect, useRef } from 'react';
import Header from '../components/mypage/edit/Header';
import Desired from '../components/mypage/edit/Desired';
import ModifyingMenu from '../components/mypage/edit/ModifyingMenu';
import Strength from '../components/mypage/edit/Strength';
import Portfolio from '../components/mypage/edit/Portfolio';
import Reception from '../components/mypage/edit/Reception';
import History from '../components/mypage/edit/History';
import Save from '../components/mypage/edit/Save';

const SECTIONS = [
  { id: 'basic-info', component: <Header /> },
  { id: 'desired-conditions', component: <Desired /> },
  { id: 'strengths', component: <Strength /> },
  { id: 'portfolio', component: <Portfolio /> },
  { id: 'history', component: <History /> },
  { id: 'reception-status', component: <Reception /> },
];

export const FormEdit = () => {
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
      { rootMargin: '-40% 0px -60% 0px', threshold: 0 },
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
            <div key={section.id} id={section.id} ref={(el) => { sectionRefs.current[index] = el; }}>
              {section.component}
            </div>
          ))}
          <Save />
        </div>
        <div className="sticky top-8 ml-8 w-64 flex-shrink-0 self-start">
          <ModifyingMenu activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
};
