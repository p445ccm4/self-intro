import { Hero } from '../components/Hero';
import { Timeline } from '../components/Timeline';
import { Skills } from '../components/Skills';

export const Home = () => {
  return (
    <>
      <Hero />
      <Timeline />
      <Skills />

      <footer className="py-8 text-center text-bea-text-secondary text-sm border-t border-bea-border mt-20 glass-panel mx-4 mb-6 md:mx-auto md:max-w-7xl">
        <p>© {new Date().getFullYear()} Chan Chun Ming, Michael. All rights reserved.</p>
      </footer>
    </>
  );
};
