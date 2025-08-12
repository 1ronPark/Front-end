import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { locationData } from '../../../../data/locationData';
import SplitButton from '../../../common/buttons/SplitButton';
import CustomDropdown from '../../../common/dropdowns/CustomDropdown';
import RecruitCard from '../../../../components/common/cards/recruits/RecruitCard';
import Switch from '../../../common/buttons/Switch';
import { useRegisterProjectStore } from "../../../../store/registerProjectStore";
import type { RecruitPosition } from "../../../../hooks/useMakeItem";

const Recruit = () => {
  const {
    projectStatus,
    collaborationRegions,
    recruitPositions,
    setField,
  } = useRegisterProjectStore();

  // 최초 렌더 시 지역 배열이 비어 있으면 기본 칸 한 개 추가
  useEffect(() => {
    if (collaborationRegions.length === 0) {
      setField('collaborationRegions', [{ siDo: '', siGunGu: '' }]);
    }
  }, [collaborationRegions.length, setField]);

  const [cityDropdownOpen, setCityDropdownOpen] = useState<Record<number, boolean>>({});
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState<Record<number, boolean>>({});
  const allCities = Object.keys(locationData);

  const handleAddLocation = () => {
    if (collaborationRegions.length < 3) {
      setField('collaborationRegions', [
        ...collaborationRegions,
        { siDo: '', siGunGu: '' },
      ]);
    }
  };

  const handleLocationChange = (
    index: number,
    field: 'siDo' | 'siGunGu',
    value: string
  ) => {
    const updated = [...collaborationRegions];
    updated[index] = {
      ...updated[index],
      [field]: value,
      ...(field === 'siDo' ? { siGunGu: '' } : {}),
    };
    setField('collaborationRegions', updated);
    if (field === 'siDo') {
      setCityDropdownOpen((prev) => ({ ...prev, [index]: false }));
    } else {
      setDistrictDropdownOpen((prev) => ({ ...prev, [index]: false }));
    }
  };

  const toggleCityDropdown = (index: number) => {
    setCityDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
    setDistrictDropdownOpen((prev) => ({ ...prev, [index]: false })); // 다른 드롭다운 닫기
  };

  const toggleDistrictDropdown = (index: number) => {
    setDistrictDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
    setCityDropdownOpen((prev) => ({ ...prev, [index]: false })); // 다른 드롭다운 닫기
  };

  const addRecruit = () => {
    const newPos: RecruitPosition = {
      positionId: Date.now(),
      mainTasks: '',
      preferentialTreatment: '',
      preferMbti: [],
      recruitNumber: 1,
    };
    setField('recruitPositions', [...recruitPositions, newPos]);
  };

  const deleteRecruit = (id: number | null) => {
    setField(
      'recruitPositions',
      recruitPositions.filter((r) => r.positionId !== id),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">파트원 모집 여부</h2>
        <Switch initialState={projectStatus} onToggle={(v) => setField('projectStatus', v)} />
      </div>
      <hr className="my-6 border-[#EAE9EA]" />
      <div className="grid grid-cols-[240px_auto] gap-8">
        <div>
          <h3 className="text-lg font-semibold">지역</h3>
          <p className="text-sm text-gray-500">선호 하는 지역을 선택해 주세요</p>
        </div>
        <div className="space-y-4 min-w-[550px]">
          <p className="text-sm font-semibold text-gray-600">지역선택 {collaborationRegions.length} / 3</p>
          {collaborationRegions
            .slice()
            .reverse()
            .map((region, reversedIndex) => {
              const index = collaborationRegions.length - 1 - reversedIndex;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="relative w-[280px]">
                    <SplitButton
                      labelText={region.siDo || '시/도'}
                      onClickLeading={() => toggleCityDropdown(index)}
                      onClickTrailing={() => toggleCityDropdown(index)}
                    />
                    <CustomDropdown
                      options={allCities}
                      onSelect={(value) => handleLocationChange(index, 'siDo', value)}
                      isOpen={cityDropdownOpen[index] || false}
                      setIsOpen={(isOpen) => setCityDropdownOpen((prev) => ({ ...prev, [index]: isOpen }))}
                      selectedValue={region.siDo}
                    />
                  </div>
                  <div className="relative w-[280px]">
                    <SplitButton
                      labelText={region.siGunGu || '시/군/구'}
                      onClickLeading={() => toggleDistrictDropdown(index)}
                      onClickTrailing={() => toggleDistrictDropdown(index)}
                      disabled={!region.siDo}
                    />
                    <CustomDropdown
                      options={region.siDo ? locationData[region.siDo] || [] : []}
                      onSelect={(value) => handleLocationChange(index, 'siGunGu', value)}
                      isOpen={districtDropdownOpen[index] || false}
                      setIsOpen={(isOpen) => setDistrictDropdownOpen((prev) => ({ ...prev, [index]: isOpen }))}
                      selectedValue={region.siGunGu}
                      searchable={true}
                    />
                  </div>
                  {index === collaborationRegions.length - 1 && collaborationRegions.length < 3 ? (
                    <button
                      className="flex w-32 cursor-pointer items-center justify-center gap-1 rounded-md bg-[#5A5891] py-3 text-white transition-all hover:scale-105 hover:bg-[#4A477C]"
                      onClick={handleAddLocation}
                    >
                      <Plus size={16} />
                      <span>추가</span>
                    </button>
                  ) : (
                    collaborationRegions.length > 1 && (
                      <button
                        className="flex w-32 cursor-pointer items-center justify-center gap-1 rounded-md border border-gray-300 bg-white py-3 text-gray-500 transition-all hover:scale-105 hover:bg-gray-100"
                        onClick={() =>
                          setField(
                            'collaborationRegions',
                            collaborationRegions.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <Minus size={16} />
                        <span>삭제</span>
                      </button>
                    )
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <hr className="my-8 border-[#EAE9EA]" />
      
      {/* 모집파트 추가하기 */}
      <div className="space-y-4">
        {recruitPositions.map(r => (
          <RecruitCard
            key={r.positionId}
            recruit={r}
            onUpdateRecruit={updated => {
              setField(
                'recruitPositions',
                recruitPositions.map(x => x.positionId === r.positionId ? updated : x)
              );
            }}
            onDelete={() => deleteRecruit(r.positionId)}
          />
        ))}

      <button
        onClick={addRecruit}
        className="w-full rounded-lg border-2 border-dashed border-gray-300 py-4 text-center text-gray-500 hover:bg-gray-50"
      >
        + 모집 파트 추가하기
      </button>
    </div>
    </div>
  );
};

export default Recruit;
