import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DetailPage } from './pages/DetailPage';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<DetailPage />} />
          <Route path="/experience/:id" element={<DetailPage />} />
          <Route path="/education/:id" element={<DetailPage />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
