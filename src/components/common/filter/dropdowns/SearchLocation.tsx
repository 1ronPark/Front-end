import React from 'react';
import SearchIcon from '../../../../assets/icons/ic_search.svg';

interface SearchLocationProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex-shrink-0 p-2 border-b border-gray-200">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="시/구/군 검색..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-2 pr-8 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <img src={SearchIcon} alt="검색" className="absolute right-2 w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchLocation;