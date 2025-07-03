// src/components/common/BasePanel.tsx
type BasePanelProps = {
  hasData: boolean;
  list: React.ReactNode;
  empty: React.ReactNode;
};

const BasePanel = ({ hasData, list, empty }: BasePanelProps) => {
  return (
    <div
      className="fixed right-[97px] w-[400px] h-screen flex flex-col bg-white overflow-auto 
      shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30),_0px_1px_3px_1px_rgba(0,0,0,0.15)]"
    >
      {hasData ? list : empty}
    </div>
  );
};

export default BasePanel;
