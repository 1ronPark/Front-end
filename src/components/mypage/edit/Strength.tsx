import { useState } from 'react';
import CloseIcon from '../../../assets/icons/ic_close.svg';
import SkillDropdown from '../../common/dropdowns/strength/SkillDropdown';
import StrengthDropdown from '../../common/dropdowns/strength/StrengthDropdown';

const Strength = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);

  const handleAddSkill = (skill: string) => {
    if (skills.length < 3 && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddStrength = (strength: string) => {
    if (strengths.length < 10 && !strengths.includes(strength)) {
      setStrengths([...strengths, strength]);
    }
  };

  const handleRemoveStrength = (strengthToRemove: string) => {
    setStrengths(strengths.filter(strength => strength !== strengthToRemove));
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
          {skills.map(skill => (
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
              {strengths.length} / 10
            </span>
          </div>
        </div>
        <StrengthDropdown onSelect={handleAddStrength} />
        <div className="flex flex-wrap gap-3">
          {strengths.map(strength => (
            <div
              key={strength}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2"
            >
              <span className="text-sm font-semimedium text-gray-700">
                {strength}
              </span>
              <button onClick={() => handleRemoveStrength(strength)}>
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
