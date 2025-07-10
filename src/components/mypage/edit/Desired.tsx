import { useState } from 'react';
import { CheckSquare, Square, Plus, Minus } from 'lucide-react';
import { locationData } from '../../../data/locationData';
import SplitButton from '../../common/buttons/SplitButton';
import CustomDropdown from '../../common/dropdowns/CustomDropdown';

const Desired = () => {
  const [locations, setLocations] = useState([{ city: '', district: '' }]);
  const [parts, setParts] = useState<string[]>([]);
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

  const handlePartChange = (part: string) => {
    setParts((prevParts) =>
      prevParts.includes(part) ? prevParts.filter((p) => p !== part) : [...prevParts, part]
    );
  };

  const toggleCityDropdown = (index: number) => {
    setCityDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
    setDistrictDropdownOpen((prev) => ({ ...prev, [index]: false })); // 다른 드롭다운 닫기
  };

  const toggleDistrictDropdown = (index: number) => {
    setDistrictDropdownOpen((prev) => ({ ...prev, [index]: !prev[index] }));
    setCityDropdownOpen((prev) => ({ ...prev, [index]: false })); // 다른 드롭다운 닫기
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">희망 조건</h2>
        <hr className="my-4 border-[#EAE9EA]" />
      </div>

      <div className="grid grid-cols-[240px_auto] gap-8">
        <div>
          <h3 className="text-lg font-semibold">지역</h3>
          <p className="text-sm text-gray-500">선호 하는 지역을 선택해 주세요</p>
        </div>
        <div className="space-y-4 min-w-[550px]">
          <p className="text-sm font-semibold text-gray-600">지역선택 {locations.length} / 3</p>
          {locations.map((location, index) => (
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
                  className="flex w-32 items-center justify-center gap-1 rounded-md bg-[#68548E] py-3 text-white"
                  onClick={handleAddLocation}
                >
                  <Plus size={16} />
                  <span>추가</span>
                </button>
              ) : (
                locations.length > 1 && (
                  <button
                    className="flex w-32 items-center justify-center gap-1 rounded-md border border-gray-300 bg-white py-3 text-gray-500"
                    onClick={() => setLocations(locations.filter((_, i) => i !== index))}
                  >
                    <Minus size={16} />
                    <span>삭제</span>
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <hr className="my-4 border-[#EAE9EA]" />

      <div className="grid grid-cols-[210px_1fr] gap-8">
        <div>
          <h3 className="text-lg font-semibold">파트</h3>
          <p className="text-sm text-gray-500">맡을 파트를 선택해 주세요</p>
        </div>
        <div className="grid grid-cols-5 gap-8 text-sm">
          {[ '프론트엔드', '백엔드', '디자인', '기획', '홍보'].map((part) => (
            <div key={part} className="flex items-center gap-2">
              <button onClick={() => handlePartChange(part)} className="flex items-center gap-2 text-gray-500">
                {parts.includes(part) ? <CheckSquare /> : <Square />}
                <span className="whitespace-nowrap">{part}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Desired;
