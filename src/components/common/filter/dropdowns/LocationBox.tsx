import React, { useState } from 'react';
import { locationData } from '../../../../data/locationData';
import SearchLocation from './SearchLocation';
import CheckIcon from '../../../../assets/icons/ic_check.svg';

interface LocationBoxProps {
  selectedLocations: string[];
  onToggleSelect: (location: string) => void;
}

const LocationBox: React.FC<LocationBoxProps> = ({ selectedLocations, onToggleSelect }) => {
  const [selectedCity, setSelectedCity] = useState<string>('서울');
  const [districtSearchTerm, setDistrictSearchTerm] = useState('');
  const allCities = Object.keys(locationData);
  const districts = locationData[selectedCity] || [];

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setDistrictSearchTerm(''); // 시/도 변경 시 구/군 검색어 초기화
  };

  const filteredDistricts = districtSearchTerm
    ? districts.filter((district) => district.toLowerCase().includes(districtSearchTerm.toLowerCase()))
    : districts;

  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex h-[340px]">
      <div className="w-1/2 border-r border-gray-200 flex flex-col">
        <h3 className="flex-shrink-0 px-4 py-2 bg-gray-100 font-semibold text-sm text-center">시 • 도</h3>
        <ul className="flex-grow py-1 overflow-y-auto">
          {allCities.map((city) => (
            <li
              key={city}
              className={`px-4 py-2 cursor-pointer text-sm ${
                selectedCity === city ? 'bg-purple-100 font-semibold text-purple-800' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-60 flex flex-col">
        <h3 className="flex-shrink-0 px-4 py-2 bg-gray-100 font-semibold text-sm text-center">시 • 구 • 군</h3>
        <SearchLocation searchTerm={districtSearchTerm} onSearchChange={setDistrictSearchTerm} />
        <ul className="flex-grow py-1 overflow-y-auto">
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((district) => {
              const fullLocationName = `${selectedCity} ${district}`;
              const isSelected = selectedLocations.includes(fullLocationName);
              return (
                <li
                  key={district}
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer text-sm ${
                    isSelected ? 'bg-purple-100 font-semibold text-purple-800' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => onToggleSelect(fullLocationName)}
                >
                  <span>{district}</span>
                  {isSelected && (
                    <img src={CheckIcon} className="w-4 h-4" alt="선택됨" />
                  )}
                </li>
              );
            })
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500 text-center">검색 결과가 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LocationBox;
