import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BeforeLoginHome } from "./HomePage/BeforeLogin/BeforeLoginHome";
import { AfterLoginHome } from "./HomePage/AfterLogin/AfterLoginHome";
import { Settings } from "./HomePage/AfterLogin/RightSide/Settings";
import { LoadingPage } from "./HomePage/LoadingPage/LoadingPage";
import { useAppStore } from "./store";
import { useEffect } from "react";

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="bg-[var(--bg-app)] min-h-screen text-[var(--text-main)]">
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