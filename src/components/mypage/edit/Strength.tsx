import { useMemo, useState } from "react";
import CloseIcon from "../../../assets/icons/ic_close.svg";
import SkillDropdown from "../../common/dropdowns/strength/SkillDropdown";
import StrengthDropdown from "../../common/dropdowns/strength/StrengthDropdown";
import { useProfileStore } from "../../../store/useProfileStore";
import type { Strength } from "../../../hooks/useStrengths";

const MAX_STRENGTH = 10;

const Strength = () => {
  const [skills, setSkills] = useState<string[]>([]);

  // const [strengths, setStrengths] = useState<string[]>([]);

  const [selected, setSelected] = useState<Strength[]>([]);

  const positions = useProfileStore((s) => s.positions);

  const position: string | undefined = useMemo(() => {
    if (!positions) return undefined;
    return Array.isArray(positions) ? positions[0] : (positions as string);
  }, [positions]);

  const handleAddSkill = (skill: string) => {
    if (skills.length < 3 && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddStrength = (item: Strength) => {
    if (selected.some((s) => s.strengthId === item.strengthId)) return;
    if (selected.length >= MAX_STRENGTH) {
      alert(`강점은 최대 ${MAX_STRENGTH}개까지 선택할 수 있어요.`);
      return;
    }
    setSelected((prev) => [...prev, item]);
  };

  const handleRemoveStrength = (strengthToRemove: number) => {
    setSelected((prev) =>
      prev.filter((s) => s.strengthId !== strengthToRemove)
    );
  };

  return (
    <div className="space-y-10">
      {/* 스킬 섹션 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 justify-between w-full">
            <h3 className="text-2xl font-medium text-gray-800">스킬</h3>
            <span className="text-sm font-medium text-gray-500">
              {skills.length} / 3
            </span>
          </div>
        </div>
        <SkillDropdown onSelect={handleAddSkill} />
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2"
            >
              <span className="text-sm font-semimedium text-gray-700">
                {skill}
              </span>
              <button onClick={() => handleRemoveSkill(skill)}>
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
              {selected.length} / 10
            </span>
          </div>
        </div>
        {/* ✅ 포지션 기반 강점 드롭다운 */}
        <StrengthDropdown
          position={position}
          disabled={!position}
          selectedIds={selected.map((s) => s.strengthId)}
          onSelect={handleAddStrength}
        />

        {!position && (
          <p className="text-sm text-gray-500">
            강점은 포지션을 먼저 선택하면 조회돼요.
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {selected.map((strength) => (
            <div
              key={strength.strengthId}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2"
            >
              <span className="text-sm font-semimedium text-gray-700">
                {strength.strengthName}
              </span>
              <button onClick={() => handleRemoveStrength(strength.strengthId)}>
                <img src={CloseIcon} alt="삭제" className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Strength;
