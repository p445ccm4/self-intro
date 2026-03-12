import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { cn } from '../utils/cn';

export const Hero = () => {
  const { personal } = portfolioData;

  const socialLinkBaseClass = "flex items-center gap-2 px-6 py-3 rounded-full transition-colors text-white";

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pb-32 relative overflow-hidden">
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
            className={cn(socialLinkBaseClass, "bg-gray-800 hover:bg-gray-700")}
          >
            <Mail size={20} />
            <span>Email</span>
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(socialLinkBaseClass, "bg-[#0077b5] hover:bg-[#006396]")}
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(socialLinkBaseClass, "bg-[#333] hover:bg-[#242424]")}
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
           <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(socialLinkBaseClass, "bg-[#25D366] hover:bg-[#20bd5a]")}
          >
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 md:bottom-10 animate-bounce flex flex-col items-center"
      >
        <span className="text-gray-500 text-lg">Scroll Down</span>
        <ChevronDown className="text-gray-500 mt-2" size={24} />
      </motion.div>
    </section>
  );
};
