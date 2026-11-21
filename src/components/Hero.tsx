import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, Github, Linkedin, Mail, MessageCircle, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { cn } from '../utils/cn';

export const Hero = () => {
  const { personal } = portfolioData;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pb-32 relative overflow-hidden bg-bea-card transition-colors duration-300">
      <div
        className="absolute inset-0 -z-10 opacity-90 hero-glow"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl animate-view-fade-in"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 solar-on-white">
          {personal.name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-bea-text-strong mb-8">
          {personal.title}
        </h2>
        <p className="text-lg text-bea-text-primary mb-10 leading-relaxed">
          {personal.summary}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a href={`mailto:${personal.email}`} className="btn btn-primary">
            <Mail size={18} />
            <span>Email</span>
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('btn text-white border-transparent')}
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>
          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="btn btn-solar"
          >
            <FileText size={18} />
            <span>Resume</span>
          </a>
          <Link to="/mockup" className="btn btn-secondary">
            <Sparkles size={18} />
            <span>Mockup</span>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 md:bottom-10 animate-bounce flex flex-col items-center"
      >
        <span className="text-bea-text-secondary text-lg">Scroll Down</span>
        <ChevronDown className="text-bea-text-secondary mt-2" size={24} />
      </motion.div>
    </section>
  );
};
