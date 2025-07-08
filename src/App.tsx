import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { FormLayout } from "./components/layout/FormLayout";
import "./App.css";

// 주디: 최상단 Navbar 표시를 위해 임의로 경로를 설정하였습니다!
//      논의 후 수정하는 방향으로 해봐요!

import { Projects } from "./pages/Projects";
import { Members } from "./pages/member/Members";
import { LightTalk } from "./pages/LightTalk";
import { MyProfile } from "./pages/MyProfile";
import { FormEdit } from "./pages/FormEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/members" element={<Members />} />
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
