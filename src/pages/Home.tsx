import { Hero } from '../components/Hero';
import { Timeline } from '../components/Timeline';
import { Skills } from '../components/Skills';

export const Home = () => {
  return (
    <>
      <Hero />
      <Timeline />
      <Skills />
      
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-card-border mt-20">
        <p>© {new Date().getFullYear()} Chan Chun Ming, Michael. All rights reserved.</p>
      </footer>
    </>
  );
};
