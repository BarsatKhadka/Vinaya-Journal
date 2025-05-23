import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BeforeLoginHome } from "./HomePage/BeforeLogin/BeforeLoginHome";
import { AfterLoginHome } from "./HomePage/AfterLogin/AfterLoginHome";
import { ContextualRAG } from "./HomePage/AfterLogin/RightSide/SideBarComponents/ContextualRAG";
import { MoodInsights } from "./HomePage/AfterLogin/RightSide/SideBarComponents/MoodInsights";
import { VInayaOllamaAI } from "./HomePage/AfterLogin/RightSide/SideBarComponents/VInayaOllamaAI";  
import { RetrievePastEntries } from "./HomePage/AfterLogin/RightSide/SideBarComponents/RetrievePastEntries";

function App() {
  return (
    <Router>
      <div className="bg-[#F7F4F0] min-h-screen">
        <Routes>
          <Route path="/" element={<BeforeLoginHome />} />
          <Route path="/app/*"  element={ <AfterLoginHome />}/>
          <Route path="/app/contextual-rag" element={<ContextualRAG />} />
          <Route path="/app/mood-insights" element={<MoodInsights />} />
          <Route path="/app/vinaya-ollama-ai" element={<VInayaOllamaAI />} />
          <Route path="/app/retrieve-past-entries" element={<RetrievePastEntries />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;