import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
// import LoadingPage from "./pages/LoadingPage";
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

import PrivateRoute from "./components/auth/PrivateRoute";
import TalkCardDetail from "./pages/lightTalk/TalkCardDetail";
import PasswordChangeForm from "./components/mypage/passwordChange/PasswordChangeForm";
import ErrorPage from "./pages/ErrorPage";
import SocialCallback from "./pages/Auth/SocialCallback";

// Add the correct import for SignupPage or use SignupEmail if that's intended

// TanStack Query 클라이언트 인스턴스 생성
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/projects" replace /> },
      { path: "projects", element: <Projects /> },
      { path: "members", element: <Members /> },
      { path: "lightTalk", element: <LightTalk /> },
      { path: "lightTalk/:lightTalkId", element: <TalkCardDetail /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "projects/:projectId", element: <ProjectDetail /> },
          { path: "members/:memberId", element: <MemberDetail /> },
          { path: "myprofile", element: <MyProfile /> },
          { path: "myprofile/password", element: <PasswordChangeForm /> },
          { path: "register-project", element: <RegisterProject /> }, // 등록
          { path: "edit-project/:projectId", element: <RegisterProject /> }, // 수정
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/loginPassword",
    element: <LoginPassword />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/signupPassword",
    element: <SignupPassword />,
  },
  {
    path: "/passwordReset",
    element: <PasswordReset />,
  },
  {
    path: "/auth/social/callback",
    element: <SocialCallback />,
  },
  {
    path: "/myprofile/edit",
    element: <FormLayout />,
    children: [{ index: true, element: <FormEdit /> }],
  },
]);

function App() {
  return (
    // 1. QueryClientProvider로 앱 전체를 감쌉니다.
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* 2. 개발자 도구를 추가하면 디버깅이 매우 편리해집니다. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
