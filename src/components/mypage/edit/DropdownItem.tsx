import { ChevronDown } from 'lucide-react';

interface DropdownItemProps {
  label: string;
}

const DropdownItem = ({ label }: DropdownItemProps) => {
  return (
    <div className="flex items-center rounded-full border border-gray-300 bg-white">
      <div className="flex-1 px-4 py-3 text-gray-700">
        {label}
      </div>
      <div className="flex items-center justify-center w-14 h-14 rounded-r-full border-l border-gray-300">
        <ChevronDown size={24} className="text-gray-500" />
      </div>
    </div>
  );
};

export default DropdownItem;
