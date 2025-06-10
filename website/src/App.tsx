import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage } from "./Home/HomePage"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/app" element={<div>App Page (Coming Soon)</div>} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
