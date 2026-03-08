import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DetailPage } from './pages/DetailPage';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
