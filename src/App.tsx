import { BrowserRouter, Routes, Route } from "react-router-dom";
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

{
  /* 로그인/회원가입 관련 컴포넌트들 */
}
import { LoginForm } from "./pages/Auth/LoginForm";
import { LoginPassword } from "./pages/Auth/LoginPassword";
import { SignupForm } from "./pages/Auth/SignupForm";
import { SignupPassword } from "./pages/Auth/SignupPassword";
import { PasswordReset } from "./pages/Auth/PasswordReset";

// Add the correct import for SignupPage or use SignupEmail if that's intended

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인/회원가입 관련 경로 설정*/}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/loginPassword" element={<LoginPassword />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signupPassword" element={<SignupPassword />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        {/* 임시로 로그인/회원가입 페이지를 최상단에 배치 */}
        <Route path="/" element={<Layout />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          {/* 회원 관련 경로 설정 */}
          <Route path="/members" element={<Members />} />
          <Route path="/members/:memberId" element={<MemberDetail />} />
          <Route path="/lighttalk" element={<LightTalk />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>

        <Route path="/myprofile/edit" element={<FormLayout />}>
          <Route index element={<FormEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
