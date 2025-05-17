import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BeforeLoginHome } from "./HomePage/BeforeLogin/BeforeLoginHome";
import { AfterLoginHome } from "./HomePage/AfterLogin/AfterLoginHome";

function App() {
  return (
    <Router>
      <div className="bg-[#F7F4F0] min-h-screen">
        <Routes>
          <Route path="/" element={<BeforeLoginHome />} />
          <Route 
            path="/app/*" 
            element={
                <AfterLoginHome />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;