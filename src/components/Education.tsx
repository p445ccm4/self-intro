import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Education = () => {
  const { education } = portfolioData;

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">Education</h2>
      
      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex items-start gap-6 bg-gray-800 p-6 rounded-xl border border-gray-700"
          >
            <div className="p-3 bg-blue-900/30 rounded-full text-blue-400">
              <GraduationCap size={32} />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
              <p className="text-lg text-blue-400 mb-2">{edu.school}</p>
              <p className="text-gray-400 text-sm">{edu.period}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
