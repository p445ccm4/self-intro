import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Timeline = () => {
  const { experience } = portfolioData;

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">Work Experience</h2>
      
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-32 bottom-0 w-0.5 bg-gray-700 transform -translate-x-1/2 hidden md:block"></div>
      <div className="absolute left-4 top-32 bottom-0 w-0.5 bg-gray-700 md:hidden"></div>

      <div className="space-y-12">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            } items-center md:items-start gap-8`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 mt-1.5 z-10 border-4 border-gray-900"></div>

            {/* Content Card */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0">
              <div className={`bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500/50 transition-colors ${
                 index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
              }`}>
                <div className="flex flex-col gap-2 mb-4">
                  <h3 className="text-xl font-bold text-blue-400">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-gray-300 font-medium">
                    <Briefcase size={16} />
                    <span>{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar size={16} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-2 text-gray-300 list-disc list-inside">
                  {exp.description.map((item, i) => (
                    <li key={i} className="leading-relaxed text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Empty space for the other side of the timeline */}
            <div className="hidden md:block w-1/2"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
