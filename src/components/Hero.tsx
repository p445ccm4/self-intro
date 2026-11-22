import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, Github, Linkedin, Mail, MessageCircle, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ThemeToggle } from './ThemeToggle';

export const Hero = () => {
  const { personal } = portfolioData;

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      <header className="relative z-[2] flex items-center justify-end gap-2 px-5 pt-6 md:px-8 md:pt-8">
        <Link
          to="/mockup"
          className="hero-corner-btn"
          aria-label="Open mockup playground"
          title="Mockup"
        >
          <Sparkles size={14} strokeWidth={2.25} aria-hidden />
        </Link>
        <ThemeToggle />
      </header>

      <div className="relative z-[1] flex flex-1 flex-col justify-center items-center text-center px-4 pb-28 pt-10 md:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl min-w-0 animate-view-fade-in glass-panel px-4 py-7 sm:px-6 sm:py-8 md:px-10 md:py-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 md:mb-6 solar-on-white break-words">
            {personal.name}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-bea-text-strong mb-6 md:mb-8">
            {personal.title}
          </h2>
          <p className="text-base sm:text-lg text-bea-text-primary mb-8 md:mb-10 leading-relaxed">
            {personal.summary}
          </p>

          <div className="hero-actions">
            <a
              href={`mailto:${personal.email}`}
              className="btn btn-glass btn-icon"
              aria-label="Email"
              title="Email"
            >
              <Mail size={16} aria-hidden />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass btn-icon"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin size={16} aria-hidden />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass btn-icon"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github size={16} aria-hidden />
            </a>
            <a
              href={personal.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass btn-icon"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageCircle size={16} aria-hidden />
            </a>
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn btn-solar btn-icon"
              aria-label="Download resume"
              title="Resume"
            >
              <FileText size={16} aria-hidden />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center z-[1]"
      >
        <span className="text-bea-text-secondary text-lg">Scroll Down</span>
        <ChevronDown className="text-bea-text-secondary mt-2" size={24} />
      </motion.div>
    </section>
  );
};
