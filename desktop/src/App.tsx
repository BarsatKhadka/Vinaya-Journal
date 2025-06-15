import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BeforeLoginHome } from "./HomePage/BeforeLogin/BeforeLoginHome";
import { AfterLoginHome } from "./HomePage/AfterLogin/AfterLoginHome";
import { Settings } from "./HomePage/AfterLogin/RightSide/Settings";
import { LoadingPage } from "./HomePage/LoadingPage/LoadingPage";

function App() {
  return (
    <Router>
      <div className="bg-[#F7F4F0] min-h-screen">
        <Routes>
          <Route path="/" element={<BeforeLoginHome />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/app/*" element={<AfterLoginHome />}/> 
          <Route path="/app/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;