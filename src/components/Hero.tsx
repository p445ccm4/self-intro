import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Hero = () => {
  const { personal } = portfolioData;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black opacity-50"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          {personal.name}
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
          {personal.title}
        </h2>
        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
          {personal.summary}
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Mail size={20} />
            <span>Email</span>
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#0077b5] hover:bg-[#006396] rounded-full transition-colors text-white"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#333] hover:bg-[#242424] rounded-full transition-colors text-white"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
           <a
            href={`tel:${personal.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-600 rounded-full transition-colors text-white"
          >
            <Phone size={20} />
            <span>Call</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 animate-bounce"
      >
        <span className="text-gray-500 text-sm">Scroll Down</span>
      </motion.div>
    </section>
  );
};
