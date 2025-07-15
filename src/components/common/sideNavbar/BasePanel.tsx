import { useEffect, useState } from "react";

// src/components/common/BasePanel.tsx
type BasePanelProps = {
  hasData: boolean;
  list: React.ReactNode;
  empty: React.ReactNode;
};

const BasePanel = ({ hasData, list, empty }: BasePanelProps) => {
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    // mount 후 translate-x-0로 전환
    const timer = setTimeout(() => setEnter(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 right-[65px] w-[300px] h-screen flex flex-col bg-[#EEE] overflow-auto z-40
        shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)]
        transform transition-transform duration-300 ease-in-out
        ${enter ? "translate-x-0" : "translate-x-[300px]"}
      `}
      >
        {hasData ? list : empty}
      </div>
    </>
  );
};

export default BasePanel;
