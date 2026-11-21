import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DetailPage } from './pages/DetailPage';
import { MockupPage } from './pages/MockupPage';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './utils/theme';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="bg-bea-canvas min-h-screen text-bea-text-primary overflow-x-hidden transition-colors duration-300">
          <div className="theme-toggle-bar">
            <ThemeToggle />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mockup" element={<MockupPage />} />
            <Route path="/project/:id" element={<DetailPage />} />
            <Route path="/experience/:id" element={<DetailPage />} />
            <Route path="/education/:id" element={<DetailPage />} />
          </Routes>
          <Analytics />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
