import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { ProjectDetailData } from "./ProjectDetailProps";

const ProjectDetailContext = createContext<ProjectDetailData | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useProjectDetailCtx = () => {
  const v = useContext(ProjectDetailContext);
  if (!v) throw new Error("ProjectDetailContext is missing");
  return v;
};

export function ProjectDetailProvider({
  value,
  children,
}: { value: ProjectDetailData; children: ReactNode }) {
  // 불필요한 리렌더 줄이기
  const memo = useMemo(() => value, [value]);
  return (
    <div>
    <ProjectDetailContext.Provider value={memo}>
      {children}
    </ProjectDetailContext.Provider>
    </div>
  );
}
