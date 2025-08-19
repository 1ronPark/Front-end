import { useEffect, useMemo } from "react";
import CloseIcon from "../../../assets/icons/ic_close.svg";
import SkillDropdown from "../../common/dropdowns/strength/SkillDropdown";
import StrengthDropdown from "../../common/dropdowns/strength/StrengthDropdown";
import { useProfileStore } from "../../../store/useProfileStore";
import type { Strength } from "../../../hooks/useStrengths";
import { useGetProfile } from "../../../hooks/useProfile";
import type { Skill } from "../../../hooks/useSkill";

const MAX_STRENGTH = 10;
const MAX_SKILL = 3;

const StrengthSection = () => {
  // 스토어 (포지션 / 강점 / 스킬)
  const positions = useProfileStore((s) => s.positions);
  const strengths = useProfileStore((s) => s.strengths);
  const skills = useProfileStore((s) => s.skills);

  const addStrength = useProfileStore((s) => s.addStrength);
  const removeStrength = useProfileStore((s) => s.removeStrength);

  const addSkill = useProfileStore((s) => s.addSkill);
  const removeSkill = useProfileStore((s) => s.removeSkill);

  // 프로필 조회 후 강점 초기 주입 (스킬도 필요하면 비슷하게 주입)
  const { data: profile } = useGetProfile();
  useEffect(() => {
    const list = profile?.result?.strengths;
    if (list && list.length) {
      useProfileStore.getState().setInitialStrengthsFromProfile(list);
    }
    const sk = profile?.result?.skills;
    if (sk && sk.length) {
      useProfileStore.getState().setInitialSkillsFromProfile(sk);
    }
  }, [profile]);

  // 단일 포지션
  const position: string | undefined = useMemo(() => {
    if (!positions) return undefined;
    return Array.isArray(positions) ? positions[0] : (positions as string);
  }, [positions]);

  // 스킬 핸들러
  const handleAddSkill = (item: Skill) => {
    if (skills.some((s) => s.skillId === item.skillId)) return;
    if (skills.length >= MAX_SKILL) {
      alert(`스킬은 최대 ${MAX_SKILL}개까지 선택할 수 있어요.`);
      return;
    }
    addSkill(item);
  };
  const handleRemoveSkill = (id: number) => removeSkill(id);

  // 강점 핸들러
  const handleAddStrength = (item: Strength) => {
    if (strengths.some((s) => s.strengthId === item.strengthId)) return;
    if (strengths.length >= MAX_STRENGTH) {
      alert(`강점은 최대 ${MAX_STRENGTH}개까지 선택할 수 있어요.`);
      return;
    }
    addStrength(item);
  };
  const handleRemoveStrength = (id: number) => removeStrength(id);

  return (
    <div className="space-y-10">
      {/* 스킬 섹션 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 justify-between w-full">
            <h3 className="text-2xl font-medium text-gray-800">스킬</h3>
            <span className="text-sm font-medium text-gray-500">
              {skills.length} / {MAX_SKILL}
            </span>
          </div>
        </div>

        {/* ✅ 포지션 기반 스킬 드롭다운 */}
        <SkillDropdown
          position={position}
          disabled={!position}
          selectedIds={skills.map((s) => s.skillId)}
          onSelect={handleAddSkill}
        />

        {/* 선택된 스킬 칩 */}
        <div className="flex flex-wrap gap-3">
          {skills.map((s) => (
            <div
              key={s.skillId}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2"
            >
              <span className="text-sm font-medium text-gray-700">
                {s.skillName}
              </span>
              <button onClick={() => handleRemoveSkill(s.skillId)}>
                <img src={CloseIcon} alt="삭제" className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 강점 섹션 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 justify-between w-full">
            <h3 className="text-2xl font-medium text-gray-800">강점</h3>
            <span className="text-sm font-medium text-gray-500">
              {strengths.length} / {MAX_STRENGTH}
            </span>
          </div>
        </div>

        {/* 포지션 기반 강점 드롭다운 */}
        <StrengthDropdown
          position={position}
          disabled={!position}
          selectedIds={strengths.map((s) => s.strengthId)}
          onSelect={handleAddStrength}
        />

        {!position && (
          <p className="text-sm text-gray-500">
            강점/스킬은 포지션을 먼저 선택하면 조회돼요.
          </p>
        )}

        {/* 선택된 강점 칩 */}
        <div className="flex flex-wrap gap-3">
          {strengths.map((s) => (
            <div
              key={s.strengthId}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2"
            >
              <span className="text-sm font-medium text-gray-700">
                {s.strengthName}
              </span>
              <button onClick={() => handleRemoveStrength(s.strengthId)}>
                <img src={CloseIcon} alt="삭제" className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrengthSection;
