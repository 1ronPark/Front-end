import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { locationData } from '../../../../data/locationData';
import SplitButton from '../../../common/buttons/SplitButton';
import CustomDropdown from '../../../common/dropdowns/CustomDropdown';
import RecruitCard from '../../../../components/common/cards/recruits/RecruitCard';
import Switch from '../../../common/buttons/Switch';

interface RecruitItem {
  id: number;
  activity: string;
  date: string;
}

const Recruit = () => {
  const [locations, setLocations] = useState([{ city: '', district: '' }]);
  const [cityDropdownOpen, setCityDropdownOpen] = useState<Record<number, boolean>>({});
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState<Record<number, boolean>>({});
  const allCities = Object.keys(locationData);

  const handleAddLocation = () => {
    if (locations.length < 3) {
      setLocations([...locations, { city: '', district: '' }]);
    }
  };

  const handleLocationChange = (index: number, field: 'city' | 'district', value: string) => {
    const newLocations = [...locations];
    newLocations[index][field] = value;
    if (field === 'city') {
      newLocations[index].district = ''; // 시/도 변경 시 시/군/구 초기화
    }
    setLocations(newLocations);
    if (field === 'city') {
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

    const [recruits, setRecruits] = useState<RecruitItem[]>([
      { id: 1, activity: '', date: '' },
    ]);
  
    const addRecruit = () => {
      setRecruits([...recruits, { id: Date.now(), activity: '', date: '' }]);
    };
  
    const deleteRecruit = (id: number) => {
      setRecruits(recruits.filter(r => r.id !== id));
    };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">파트원 모집 여부</h2>
        <Switch/>
      </div>
      <hr className="my-6 border-[#EAE9EA]" />
      <div className="grid grid-cols-[240px_auto] gap-8">
        <div>
          <h3 className="text-lg font-semibold">지역</h3>
          <p className="text-sm text-gray-500">선호 하는 지역을 선택해 주세요</p>
        </div>
        <div className="space-y-4 min-w-[550px]">
          <p className="text-sm font-semibold text-gray-600">지역선택 {locations.length} / 3</p>
          {locations
            .slice()
            .reverse()
            .map((location, reversedIndex) => {
              const index = locations.length - 1 - reversedIndex;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="relative w-[280px]">
                    <SplitButton
                      labelText={location.city || '시/도'}
                      onClickLeading={() => toggleCityDropdown(index)}
                      onClickTrailing={() => toggleCityDropdown(index)}
                    />
                    <CustomDropdown
                      options={allCities}
                      onSelect={(value) => handleLocationChange(index, 'city', value)}
                      isOpen={cityDropdownOpen[index] || false}
                      setIsOpen={(isOpen) => setCityDropdownOpen((prev) => ({ ...prev, [index]: isOpen }))}
                      selectedValue={location.city}
                    />
                  </div>
                  <div className="relative w-[280px]">
                    <SplitButton
                      labelText={location.district || '시/군/구'}
                      onClickLeading={() => toggleDistrictDropdown(index)}
                      onClickTrailing={() => toggleDistrictDropdown(index)}
                      disabled={!location.city}
                    />
                    <CustomDropdown
                      options={location.city ? locationData[location.city] || [] : []}
                      onSelect={(value) => handleLocationChange(index, 'district', value)}
                      isOpen={districtDropdownOpen[index] || false}
                      setIsOpen={(isOpen) => setDistrictDropdownOpen((prev) => ({ ...prev, [index]: isOpen }))}
                      selectedValue={location.district}
                      searchable={true}
                    />
                  </div>
                  {index === locations.length - 1 && locations.length < 3 ? (
                    <button
                      className="flex w-32 cursor-pointer items-center justify-center gap-1 rounded-md bg-[#5A5891] py-3 text-white transition-all hover:scale-105 hover:bg-[#4A477C]"
                      onClick={handleAddLocation}
                    >
                      <Plus size={16} />
                      <span>추가</span>
                    </button>
                  ) : (
                    locations.length > 1 && (
                      <button
                        className="flex w-32 cursor-pointer items-center justify-center gap-1 rounded-md border border-gray-300 bg-white py-3 text-gray-500 transition-all hover:scale-105 hover:bg-gray-100"
                        onClick={() => setLocations(locations.filter((_, i) => i !== index))}
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
        {recruits.map(recruit => (
          <RecruitCard key={recruit.id} onDelete={() => deleteRecruit(recruit.id)} />
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
