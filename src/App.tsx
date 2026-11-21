import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DetailPage } from './pages/DetailPage';
import { MockupPage } from './pages/MockupPage';
import { ThemeProvider } from './utils/theme';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="site-shell min-h-screen text-bea-text-primary overflow-x-hidden transition-colors duration-300">
          <div className="site-backdrop" aria-hidden>
            <div className="site-backdrop-fill" />
            <div className="site-mist" />
          </div>
          <div className="site-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mockup" element={<MockupPage />} />
              <Route path="/project/:id" element={<DetailPage />} />
              <Route path="/experience/:id" element={<DetailPage />} />
              <Route path="/education/:id" element={<DetailPage />} />
            </Routes>
          </div>
          <Analytics />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
