import { useState } from 'react';
import { ChevronDown, CheckSquare, Square } from 'lucide-react';

const Desired = () => {
  const [locations, setLocations] = useState([{ city: '', district: '' }]);
  const [parts, setParts] = useState<string[]>([]);

  const handleAddLocation = () => {
    if (locations.length < 3) {
      setLocations([...locations, { city: '', district: '' }]);
    }
  };

  const handleLocationChange = (index: number, field: 'city' | 'district', value: string) => {
    const newLocations = [...locations];
    newLocations[index][field] = value;
    setLocations(newLocations);
  };

  const handlePartChange = (part: string) => {
    setParts((prevParts) =>
      prevParts.includes(part) ? prevParts.filter((p) => p !== part) : [...prevParts, part]
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">희망 조건</h2>
        <hr className="my-4" />
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-8">
        <div>
          <h3 className="text-lg font-semibold">지역</h3>
          <p className="text-sm text-gray-500">선호 하는 지역을 선택해 주세요</p>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-600">지역선택 {locations.length} / 3</p>
          {locations.map((location, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="relative w-60">
                <select
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 pr-8 text-gray-500"
                  value={location.city}
                  onChange={(e) => handleLocationChange(index, 'city', e.target.value)}
                >
                  <option value="">시/도</option>
                  <option value="서울특별시">서울특별시</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              <div className="relative w-60">
                <select
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-3 pr-8 text-gray-500"
                  value={location.district}
                  onChange={(e) => handleLocationChange(index, 'district', e.target.value)}
                >
                  <option value="">시/군/구</option>
                  <option value="서울 전체">서울 전체</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              {index === 0 && (
                <button
                  className="rounded-md bg-[#68548E] px-6 py-3 text-white"
                  onClick={handleAddLocation}
                  disabled={locations.length >= 3}
                >
                  추가
                </button>
              )}
              {index > 0 && (
                <button
                  className="rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-500"
                  onClick={() => setLocations(locations.filter((_, i) => i !== index))}
                >
                  삭제
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid grid-cols-[240px_1fr] gap-8">
        <div>
          <h3 className="text-lg font-semibold">파트</h3>
          <p className="text-sm text-gray-500">맡을 파트를 선택해 주세요</p>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {[ '프론트엔드', '백엔드', '디자인', '기획', '홍보'].map((part) => (
            <div key={part} className="flex items-center gap-2">
              <button onClick={() => handlePartChange(part)} className="flex items-center gap-2">
                {parts.includes(part) ? <CheckSquare /> : <Square />}
                <span>{part}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Desired;
