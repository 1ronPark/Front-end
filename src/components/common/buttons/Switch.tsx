import { useState } from 'react';

interface SwitchProps {
  initialState?: boolean;
  onToggle?: (toggled: boolean) => void;
}

const Switch = ({ initialState = false, onToggle }: SwitchProps) => {
  const [toggled, setToggled] = useState(initialState);

  const handleToggle = () => {
    const newState = !toggled;
    setToggled(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-[43px] flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none ${
        toggled
          ? 'border-[#5A5891] bg-[#5A5891]'
          : 'border-gray-400 bg-gray-200'
      }`}
      role="switch"
      aria-checked={toggled}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          toggled ? 'translate-x-[20px]' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default Switch;