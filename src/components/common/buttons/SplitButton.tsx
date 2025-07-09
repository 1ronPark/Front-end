import { ChevronDown } from 'lucide-react';

interface SplitButtonProps {
  labelText: string;
  onClickLeading?: () => void;
  onClickTrailing?: () => void;
  disabled?: boolean;
}

const SplitButton = ({
  labelText,
  onClickLeading,
  onClickTrailing,
  disabled = false,
}: SplitButtonProps) => {
  return (
    <div className="flex overflow-hidden gap-x-0.5">
      <button
        className="flex-1 px-4 py-3 text-gray-700 text-base font-medium disabled:text-gray-400 border border-gray-300 rounded-l-full"
        onClick={onClickLeading}
        disabled={disabled}
      >
        {labelText}
      </button>
      <button
        className="flex items-center justify-center w-14 h-14 disabled:border-gray-200 border border-gray-300 rounded-r-full"
        onClick={onClickTrailing}
        disabled={disabled}
      >
        <ChevronDown size={24} className="text-gray-500 disabled:text-gray-400" />
      </button>
    </div>
  );
};

export default SplitButton;
