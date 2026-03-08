import { useParams, Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';
import { ArrowLeft, Calendar, Briefcase, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectPage = () => {
  const { id } = useParams();
  const project = portfolioData.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-6 text-gray-300 mb-8">
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-blue-400" />
            <span className="text-xl">{project.role} at {project.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-blue-400" />
            <span className="text-xl">{project.year}</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code className="text-blue-400" /> Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full border border-blue-800/50">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">Project Details</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {project.description}
          </p>
          
          {project.details && project.details.length > 0 && (
            <ul className="space-y-4">
              {project.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="mt-2 w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};
