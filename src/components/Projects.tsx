import { motion } from 'framer-motion';
import { ExternalLink, Github, PlayCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">Featured Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500/50 transition-all hover:-translate-y-2"
          >
            {/* Video Placeholder */}
            <div className="h-48 bg-gray-900 flex items-center justify-center relative group cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              <PlayCircle size={48} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
              <span className="absolute bottom-4 right-4 text-xs bg-black/60 px-2 py-1 rounded text-white">Demo Coming Soon</span>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">{project.year}</span>
              </div>
              
              <p className="text-blue-400 text-sm mb-2">{project.company}</p>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full border border-blue-800/50">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <Github size={16} /> Code
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <ExternalLink size={16} /> Live Demo
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
