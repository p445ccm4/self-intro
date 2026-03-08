import { motion } from 'framer-motion';
import { Briefcase, Sparkles, Bot } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useNavigate } from 'react-router-dom';

export const Timeline = () => {
  const { projects } = portfolioData;
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">Project Timeline</h2>
      
      {/* Vertical Line */}
      {/* Mobile: Left side (aligned with dots) */}
      {/* Desktop: Center */}
      <div className="absolute left-24 md:left-1/2 top-32 bottom-0 w-0.5 bg-gray-700 transform -translate-x-1/2"></div>

      <div className="space-y-12">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const prevProject = projects[index - 1];
          const showChatGPT = prevProject && Number.parseInt(prevProject.year) >= 2023 && Number.parseInt(project.year) <= 2022;
          const showManus = prevProject && Number.parseInt(prevProject.year) >= 2025 && Number.parseInt(project.year) <= 2024;

          return (
            <div key={project.id}>
              {/* Manus Milestone Marker */}
              {showManus && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative flex items-center justify-center my-12 md:my-24"
                >
                  {/* Horizontal Line */}
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                  
                  {/* Badge */}
                  <div className="relative z-10 bg-gray-900 border border-blue-500/50 px-6 py-2 rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <Bot className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-100 font-semibold text-sm md:text-base">
                      Manus Released (Mar 2025) - Era of AI Agents
                    </span>
                  </div>
                </motion.div>
              )}

              {/* ChatGPT Milestone Marker */}
              {showChatGPT && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative flex items-center justify-center my-12 md:my-24"
                >
                  {/* Horizontal Line */}
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                  
                  {/* Badge */}
                  <div className="relative z-10 bg-gray-900 border border-blue-500/50 px-6 py-2 rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-100 font-semibold text-sm md:text-base">
                      ChatGPT Released (Nov 2022) - Dawn of Generative AI
                    </span>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                onClick={() => navigate(`/project/${project.id}`)}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 cursor-pointer group ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-20 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 mt-1.5 md:mt-0 z-10 border-4 border-gray-900 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                {/* Year Display (Opposite Side) */}
                <div className={`w-full md:w-1/2 flex ${
                  isEven ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'
                }`}>
                  <div className="hidden md:block">
                    <span className="text-5xl font-bold text-gray-700 group-hover:text-gray-500 transition-colors duration-300">
                      {project.year}
                    </span>
                  </div>
                  {/* Mobile Year (Left side) */}
                  <div className="md:hidden absolute left-0 top-0 w-20 text-right pr-4 pt-1">
                    <span className="text-lg font-bold text-gray-500">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  className={`w-full md:w-1/2 pl-28 md:pl-0 ${
                    isEven ? 'md:pl-12' : 'md:pr-12'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 group-hover:border-blue-500 transition-all relative overflow-hidden">
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex flex-col gap-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="flex flex-col gap-1.5">
                        <span className="text-lg font-semibold text-blue-300">
                          {project.role}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Briefcase size={14} />
                          <span>{project.company}</span>
                        </div>
                      </div>

                      {/* Description Preview */}
                      <p className="text-gray-400 text-sm line-clamp-2 mt-2">
                        {project.description}
                      </p>

                      {/* Tech Stack Tags (Mini) */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tech.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-900/50 rounded text-gray-400 border border-gray-700/50">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-xs px-2 py-1 text-gray-500">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
