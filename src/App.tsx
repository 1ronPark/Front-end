import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Layout } from "./components/layout/Layout";
import { FormLayout } from "./components/layout/FormLayout";
import "./App.css";

// 주디: 최상단 Navbar 표시를 위해 임의로 경로를 설정하였습니다!
//      논의 후 수정하는 방향으로 해봐요!

import { Projects } from "./pages/project/Projects";
import { ProjectDetail } from "./pages/project/ProjectDetails";
import { Members } from "./pages/member/Members";
import { LightTalk } from "./pages/LightTalk";
import { MyProfile } from "./pages/MyProfile";
import MemberDetail from "./pages/member/MemberDetail";
import { FormEdit } from "./pages/FormEdit";
import { RegisterProject } from "./components/mypage/RegisterProject";

{
  /* 로그인/회원가입 관련 컴포넌트들 */
}
import { LoginForm } from "./pages/Auth/LoginForm";
import { LoginPassword } from "./pages/Auth/LoginPassword";
import { SignupForm } from "./pages/Auth/SignupForm";
import { SignupPassword } from "./pages/Auth/SignupPassword";
import { PasswordReset } from "./pages/Auth/PasswordReset";
import TalkCardDetail from "./pages/lightTalk/TalkCardDetail";
import PrivateRoute from "./components/auth/PrivateRoute";

// Add the correct import for SignupPage or use SignupEmail if that's intended

// TanStack Query 클라이언트 인스턴스 생성
const queryClient = new QueryClient();

function App() {
  return (
    // 1. QueryClientProvider로 앱 전체를 감쌉니다.
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 로그인/회원가입 관련 경로는 그대로 둡니다. */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/loginPassword" element={<LoginPassword />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signupPassword" element={<SignupPassword />} />
          <Route path="/passwordReset" element={<PasswordReset />} />

          {/* 메인 레이아웃을 사용하는 페이지 그룹 */}
          <Route element={<Layout />}>
            {/* 로그인하지 않아도 보이는 페이지 */}
            <Route index element={<Navigate to="/projects" replace />} />
            <Route path="projects" element={<Projects />} />
            <Route path="members" element={<Members />} />
            <Route path="lighttalk" element={<LightTalk />} />

            {/* 로그인 후에만 접근 가능한 페이지 */}
            <Route element={<PrivateRoute />}>
              <Route path="projects/:projectId" element={<ProjectDetail />} />
              <Route path="members/:memberId" element={<MemberDetail />} />
              <Route path="myprofile" element={<MyProfile />} />
              <Route path="register-project" element={<RegisterProject />} />
            </Route>
          </Route>

          <Route path="/myprofile/edit" element={<FormLayout />}>
            <Route index element={<FormEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* 2. 개발자 도구를 추가하면 디버깅이 매우 편리해집니다. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
