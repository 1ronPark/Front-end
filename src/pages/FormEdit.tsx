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
import {
  usePostStrengths,
  useDeleteStrengthsById,
} from "../hooks/useStrengths";
import Reception from "../components/mypage/edit/Reception";
import { usePostProfileImage } from "../hooks/useProfile";
import { useDeleteSkillById, usePostSkills } from "../hooks/useSkill";

const SECTIONS = [
  // { id: "basic-info", component: <Header /> },
  { id: "desired-conditions", component: <Desired /> },
  { id: "strengths", component: <Strength /> },
  { id: "portfolio", component: <Portfolio /> },
  { id: "history", component: <History /> },
  { id: "reception-status", component: <Reception /> },
];

export const FormEdit = () => {
  // --- 새로 추가: 프로필 이미지 임시 상태 ---
  const [pendingProfileFile, setPendingProfileFile] = useState<File | null>(
    null
  );
  const [pendingPreviewUrl, setPendingPreviewUrl] = useState<string | null>(
    null
  );

  // Header에서 파일 선택 후 적용하면 여기로 올라옴
  const handlePickProfileImage = (file: File) => {
    setPendingProfileFile(file);
    setPendingPreviewUrl(URL.createObjectURL(file)); // 미리보기 반영
  };
  // FormData 업로드용
  const { mutate: uploadProfileImage } = usePostProfileImage();

  // ===== Store =====
  // 포지션
  const positions = useProfileStore((s) => s.positions);
  const initialPositions = useProfileStore((s) => s.initialPositions);
  // 지역
  const initialRegions = useProfileStore((s) => s.initialRegions);
  const regions = useProfileStore((s) => s.regions);
  //강점
  const initialStrengths = useProfileStore((s) => s.initialStrengths);
  const strengths = useProfileStore((s) => s.strengths);
  //스킬
  const initialSkills = useProfileStore((s) => s.initialSkills);
  const skills = useProfileStore((s) => s.skills);

  // ===== Hooks =====
  // 포지션
  const { mutateAsync: postPosition, isPending: posting } = usePostPositions();
  const { mutateAsync: deletePosition, isPending: deleting } =
    useDeletePositions();
  // 지역
  const { mutateAsync: postRegion, isPending: postingRegion } = usePostRegion();
  const { mutateAsync: deleteRegionById, isPending: deletingRegion } =
    useDeleteRegionById();
  //강점
  const { mutateAsync: postStrengths, isPending: postingStrengths } =
    usePostStrengths();
  const { mutateAsync: deleteStrengthById, isPending: deletingStrengths } =
    useDeleteStrengthsById();
  //스킬
  const { mutateAsync: PostSkills, isPending: PostingSkills } = usePostSkills();
  const { mutateAsync: deleteSkillById, isPending: deletingSkills } =
    useDeleteSkillById();

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

    // 3) 강점 diff
    const curIds = new Set(strengths.map((s) => s.strengthId));
    const initIds = new Set(initialStrengths.map((s) => s.strengthId));

    const strengthsToAdd = strengths.filter((s) => !initIds.has(s.strengthId));
    const strengthsToRemove = initialStrengths.filter(
      (s) => !curIds.has(s.strengthId)
    );

    // 4) 스킬 diff
    const curSkillIds = new Set(skills.map((s) => s.skillId));
    const initSkillIds = new Set(initialSkills.map((s) => s.skillId));

    const skillsToAdd = skills.filter((s) => !initSkillIds.has(s.skillId));
    const skillsToRemove = initialSkills.filter(
      (s) => !curSkillIds.has(s.skillId)
    );

    // ✅ 이미지 변경도 함께 판단
    const hasProfileImageChange = !!pendingProfileFile;

    if (
      toAdd.length === 0 &&
      toRemove.length === 0 &&
      regionsToAdd.length === 0 &&
      regionsToRemove.length === 0 &&
      strengthsToAdd.length === 0 &&
      strengthsToRemove.length === 0 &&
      skillsToAdd.length === 0 &&
      skillsToRemove.length === 0 &&
      !hasProfileImageChange
    ) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      // --- 지역 삭제
      for (const ir of regionsToRemove) {
        if (!ir.id) continue;
        await deleteRegionById({
          endpoint: import.meta.env.VITE_API_REGION_DELETE_ENDPOINT.replace(
            ":id",
            String(ir.id)
          ),
        });
      }

      // --- 포지션 삭제
      for (const pos of toRemove) {
        await deletePosition({
          endpoint:
            import.meta.env.VITE_API_DELETE_POSITIONS_ENDPOINT +
            `?positionName=${encodeURIComponent(pos)}`,
        });
      }

      // --- 지역 추가
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

      // --- 포지션 추가
      for (const pos of toAdd) {
        await postPosition({
          endpoint:
            import.meta.env.VITE_API_POST_POSITION_ENDPOINT +
            `?positionName=${encodeURIComponent(pos)}`,
        });
      }

      // 끝에 슬래시 제거 후 id 붙이기(// 예방)
      const baseStrengths =
        import.meta.env.VITE_API_POST_STRENGTHS_ENDPOINT.replace(/\/$/, "");

      const baseSkills = import.meta.env.VITE_API_POST_SKILLS_ENDPOINT.replace(
        /\/$/,
        ""
      );

      // --- 강점 제거 (배치 전송 가정; 없으면 for-of로 개별 전송)
      // ✅강점 제거
      for (const s of strengthsToRemove) {
        await deleteStrengthById({
          endpoint: `${baseStrengths}/${s.strengthId}`, // ← /{id}로 확정
        });
      }

      // --- 강점 추가 (배치 전송 가정; 없으면 for-of로 개별 전송)
      // ✅ 강점 추가: POST { strengthId }
      for (const s of strengthsToAdd) {
        await postStrengths({
          // 기본 endpoint 사용 (훅에 설정돼 있음)
          body: { strengthId: s.strengthId },
        });
      }

      // ✅ 스킬 제거
      for (const s of skillsToRemove) {
        await deleteSkillById({
          endpoint: `${baseSkills}/${s.skillId}`,
        });
      }
      // ✅ 스킬 추가
      for (const s of skillsToAdd) {
        await PostSkills({
          body: { skillId: s.skillId },
        });
      }

      // --- 프로필 이미지 업로드 (선택된 경우에만)
      if (pendingProfileFile) {
        const fd = new FormData();
        fd.append("profileImage", pendingProfileFile); // ← 필드명 반드시 스웨거와 일치
        await new Promise<void>((resolve, reject) => {
          uploadProfileImage(
            { body: fd },
            { onSuccess: () => resolve(), onError: (e) => reject(e) }
          );
        });
        setPendingProfileFile(null);
        setPendingPreviewUrl(null);
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
          {/* Header에 미리보기 URL과 파일 선택 콜백을 내려줌 */}
          <div id="basic-info" className="min-h-[200px]">
            <Header
              pendingPreviewUrl={pendingPreviewUrl}
              onPickProfileImage={handlePickProfileImage}
            />
          </div>
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
            disabled={
              posting ||
              deleting ||
              postingRegion ||
              deletingRegion ||
              postingStrengths ||
              deletingStrengths ||
              PostingSkills ||
              deletingSkills
            }
          />
        </div>

        <div className="sticky top-8 ml-8 w-64 flex-shrink-0 self-start">
          <ModifyingMenu
            activeSection={activeSection}
            onSave={handleSave} // ← 저장 함수 전달
          />
        </div>
      </div>
    </div>
  );
};
