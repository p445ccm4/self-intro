import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white overflow-x-hidden">
      <Hero />
      <Timeline />
      <Projects />
      <Skills />
      <Education />
      
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800 mt-20">
        <p>© {new Date().getFullYear()} Chan Chun Ming, Michael. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
