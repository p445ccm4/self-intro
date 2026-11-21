import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DetailPage } from './pages/DetailPage';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
      <div className="bg-bea-canvas min-h-screen text-bea-text-primary overflow-x-hidden">
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
