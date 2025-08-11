import { useState, useEffect, useRef } from "react";
import Header from "../components/mypage/edit/Header";
import Desired from "../components/mypage/edit/Desired";
import ModifyingMenu from "../components/mypage/edit/ModifyingMenu";
import Strength from "../components/mypage/edit/Strength";
import Portfolio from "../components/mypage/edit/Portfolio";
// import Reception from "../components/mypage/edit/Reception";
import History from "../components/mypage/edit/History";
import Save from "../components/mypage/edit/Save";

import { useProfileStore } from "../store/useProfileStore";
import { useDeletePositions, usePostPositions } from "../hooks/usePositions";
import { useDeleteRegionById, usePostRegion } from "../hooks/useRegion";
// import {
//   usePostStrengths,
//   useDeleteStrengthsById,
// } from "../hooks/useStrengths";
import Reception from "../components/mypage/edit/Reception";

// const MOCK_USER_DATA = {
//   id: 1,
//   name: "홍길동",
//   nickname: "홍",
//   age: 23,
//   role: "디자이너",
//   location: "서울",
//   gender: "남",
//   phone: "010-1234-5678",
//   email: "hong@hong.ac.kr",
//   univ: "길동대학교",
//   mbti: "INTJ",
//   intro: "기술과 디자인을 넘나들며 방향을 설계하는 실전형 디자이너",
//   blog: "https://velog.io/@honggildong",
// };

const SECTIONS = [
  { id: "basic-info", component: <Header /> },
  { id: "desired-conditions", component: <Desired /> },
  { id: "strengths", component: <Strength /> },
  { id: "portfolio", component: <Portfolio /> },
  { id: "history", component: <History /> },
  { id: "reception-status", component: <Reception /> },
];

export const FormEdit = () => {
  // ===== Store =====
  // 포지션
  const positions = useProfileStore((s) => s.positions);
  const initialPositions = useProfileStore((s) => s.initialPositions);

  // 지역
  const initialRegions = useProfileStore((s) => s.initialRegions);
  const regions = useProfileStore((s) => s.regions);

  // ===== Hooks =====
  // 포지션
  const { mutateAsync: postPosition, isPending: posting } = usePostPositions();
  const { mutateAsync: deletePosition, isPending: deleting } =
    useDeletePositions();

  // 지역
  const { mutateAsync: postRegion, isPending: postingRegion } = usePostRegion();
  const { mutateAsync: deleteRegionById, isPending: deletingRegion } =
    useDeleteRegionById();

  // ===== Save =====
  const handleSave = async () => {
    // 1) 포지션 diff
    const toAdd = positions.filter((p) => !initialPositions.includes(p));
    const toRemove = initialPositions.filter((p) => !positions.includes(p));

    // 2) 지역 diff
    const sameRegion = (
      a: { siDo: string; siGunGu: string },
      b: { siDo: string; siGunGu: string }
    ) => a.siDo === b.siDo && a.siGunGu === b.siGunGu;

    const regionsToAdd = regions.filter(
      (r) => !initialRegions.some((ir) => sameRegion(ir, r))
    );
    const regionsToRemove = initialRegions.filter(
      (ir) => !regions.some((r) => sameRegion(ir, r))
    );

    // 변경 없음 가드
    if (
      toAdd.length === 0 &&
      toRemove.length === 0 &&
      regionsToAdd.length === 0 &&
      regionsToRemove.length === 0
    ) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      // 권장 순서: 삭제 → 추가

      // --- 지역 삭제 (DELETE /api/v1/members/regions/{memberRegionId})
      for (const ir of regionsToRemove) {
        if (!ir.id) continue; // id 없으면 서버에 없던 신규 항목
        await deleteRegionById({
          endpoint: `/api/v1/members/regions/${ir.id}`,
        });
      }

      // --- 포지션 삭제 (DELETE /api/v1/members/position?positionName=...)
      for (const pos of toRemove) {
        await deletePosition({
          endpoint: `/api/v1/members/position?positionName=${encodeURIComponent(
            pos
          )}`,
        });
      }

      // --- 지역 추가 (POST 배열 바디)
      if (regionsToAdd.length > 0) {
        await postRegion({
          body: {
            memberRegions: regionsToAdd.map((r) => ({
              siDo: r.siDo,
              siGunGu: r.siGunGu,
            })),
          },
        });
      }

      // --- 포지션 추가 (POST /api/v1/members/position?positionName=...)
      for (const pos of toAdd) {
        await postPosition({
          endpoint: `/api/v1/members/position?positionName=${encodeURIComponent(
            pos
          )}`,
        });
      }
      alert("프로필이 저장되었습니다.");
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  // ===== Side menu active section tracking =====
  const [activeSection, setActiveSection] = useState("basic-info");
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    const refsSnapshot = [...sectionRefs.current];
    refsSnapshot.forEach((ref) => ref && observer.observe(ref));
    return () => refsSnapshot.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  // ===== Render =====
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
          <Save
            onClick={handleSave}
            disabled={posting || deleting || postingRegion || deletingRegion}
          />
        </div>

        <div className="sticky top-8 ml-8 w-64 flex-shrink-0 self-start">
          <ModifyingMenu activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
};
