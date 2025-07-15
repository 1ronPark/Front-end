import { useEffect, useState } from "react";

type BasePanelProps = {
  hasData: boolean;
  list: React.ReactNode;
  empty: React.ReactNode;
  isActive: boolean; // 패널 닫을지 여부 (완전히 닫을 때만 false)
  panelKey?: string;
};

const BasePanel = ({
  hasData,
  list,
  empty,
  isActive,
  panelKey,
}: BasePanelProps) => {
  const [shouldRender, setShouldRender] = useState(isActive);
  const [isExiting, setIsExiting] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [prevKey, setPrevKey] = useState(panelKey);

  // 패널 열기
  useEffect(() => {
    if (isActive && !shouldRender) {
      setShouldRender(true);
    }
  }, [isActive, shouldRender]);

  // 처음 렌더된 후 슬라이드 인 시작
  useEffect(() => {
    if (isActive && shouldRender) {
      setHasEntered(false); // 초기화
      const timer = setTimeout(() => {
        setHasEntered(true); // 다음 프레임에 애니메이션 활성화
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isActive, shouldRender]);

  // 패널 닫기
  useEffect(() => {
    if (!isActive && shouldRender) {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        setShouldRender(false);
        setIsExiting(false);
        setHasEntered(false);
      }, 200); // transition 시간
      return () => clearTimeout(exitTimer);
    }
  }, [isActive, shouldRender]);

  // 패널 내용 변경 시 닫기 애니메이션 생략
  useEffect(() => {
    if (isActive && panelKey !== prevKey) {
      setPrevKey(panelKey);
      setHasEntered(true);
      setIsExiting(false);
    }
  }, [panelKey, isActive, prevKey]);

  if (!shouldRender) return null;

  return (
    <div
      className={`
        fixed top-0 right-[65px] w-[300px] h-screen z-40
        bg-[#EEE] overflow-auto shadow-[0px_1px_3px_1px_rgba(0,0,0,0.15)]
        transform transition-transform duration-200 ease-in-out
        ${
          isExiting
            ? "translate-x-[300px]"
            : hasEntered
            ? "translate-x-0"
            : "translate-x-[300px]"
        }
      `}
    >
      {/* 내부 콘텐츠는 부모에서 바뀌는 대로 반영됨 */}
      {hasData ? list : empty}
    </div>
  );
};

export default BasePanel;
