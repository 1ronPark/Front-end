import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import "./App.css";

// 주디: 최상단 Navbar 표시를 위해 임의로 경로를 설정하였습니다!
//      논의 후 수정하는 방향으로 해봐요!

import { Projects } from "./pages/Projects";
import { Members } from "./pages/Members";
import { LightTalk } from "./pages/LightTalk";
import { MyProfile } from "./pages/MyProfile";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
