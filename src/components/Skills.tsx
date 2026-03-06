import { motion } from 'framer-motion';
import { BookOpen, Code, Database, Server, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Skills = () => {
  const { skills } = portfolioData;

  const categories = [
    { title: 'Generative AI', icon: <Code size={24} />, skills: skills.genAI, color: 'text-purple-400' },
    { title: 'MLOps', icon: <Terminal size={24} />, skills: skills.mlOps, color: 'text-green-400' },
    { title: 'Database', icon: <Database size={24} />, skills: skills.database, color: 'text-blue-400' },
    { title: 'Web Development', icon: <Server size={24} />, skills: skills.web, color: 'text-orange-400' },
    { title: 'DevOps', icon: <BookOpen size={24} />, skills: skills.devOps, color: 'text-red-400' },
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">Skills & Knowledge</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-gray-500 transition-colors"
          >
            <div className={`flex items-center gap-3 mb-4 ${category.color}`}>
              {category.icon}
              <h3 className="text-xl font-bold">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
