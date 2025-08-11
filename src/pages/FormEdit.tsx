import { useState, useEffect, useRef } from "react";
import Header from "../components/mypage/edit/Header";
import Desired from "../components/mypage/edit/Desired";
import ModifyingMenu from "../components/mypage/edit/ModifyingMenu";
import Strength from "../components/mypage/edit/Strength";
import Portfolio from "../components/mypage/edit/Portfolio";
{
  /*import Reception from '../components/mypage/edit/Reception';*/
}
import History from "../components/mypage/edit/History";
import Save from "../components/mypage/edit/Save";
import { useProfileStore } from "../store/useProfileStore";
import { useDeletePositions, usePostPositions } from "../hooks/usePositions";

const MOCK_USER_DATA = {
  id: 1,
  name: "홍길동",
  nickname: "홍",
  age: 23,
  role: "디자이너",
  location: "서울",
  gender: true,
  phoneNumber: "010-1234-5678",
  email: "hong@hong.ac.kr",
  school: "길동대학교",
  mbti: "INTJ",
  intro: "기술과 디자인을 넘나들며 방향을 설계하는 실전형 디자이너",
  blog: "https://velog.io/@honggildong",
};

const SECTIONS = [
  { id: "basic-info", component: <Header {...MOCK_USER_DATA} /> },
  { id: "desired-conditions", component: <Desired /> },
  { id: "strengths", component: <Strength /> },
  { id: "portfolio", component: <Portfolio /> },
  { id: "history", component: <History /> },
];
{
  /*{ id: 'reception-status', component: <Reception /> },*/
}
export const FormEdit = () => {
  const positions = useProfileStore((s) => s.positions);
  const initialPositions = useProfileStore((s) => s.initialPositions);

  const { mutateAsync: postPosition, isPending: posting } = usePostPositions();
  const { mutateAsync: deletePosition, isPending: deleting } =
    useDeletePositions();

  const handleSave = async () => {
    const toAdd = positions.filter((p) => !initialPositions.includes(p));
    const toRemove = initialPositions.filter((p) => !positions.includes(p));

    if (toAdd.length === 0 && toRemove.length === 0) {
      alert("변경된 포지션이 없습니다.");
      return;
    }

    try {
      // 안전하게 삭제 → 추가 순서
      for (const pos of toRemove) {
        await deletePosition({
          endpoint: `/api/v1/members/position?positionName=${encodeURIComponent(
            pos
          )}`,
        });
      }
      for (const pos of toAdd) {
        await postPosition({
          endpoint: `/api/v1/members/position?positionName=${encodeURIComponent(
            pos
          )}`,
        });
      }

      alert("포지션이 저장되었습니다.");
      // 다음 렌더 시 Desired에서 useGetProfile이 다시 불리면 자동 복원됨
      // (리스트 갱신이 필요하면 프로필 GET 쿼리 키를 invalidate하거나 페이지 재진입시 자동으로 됨)
    } catch {
      alert("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };
  const [activeSection, setActiveSection] = useState("basic-info");
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
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
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
          <Save onClick={handleSave} disabled={posting || deleting} />
        </div>
        <div className="sticky top-8 ml-8 w-64 flex-shrink-0 self-start">
          <ModifyingMenu activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
};
