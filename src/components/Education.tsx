import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Education = () => {
  const { education } = portfolioData;

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 solar-on-white">Education</h2>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex items-start gap-6 card"
          >
            <div className="p-3 rounded-full text-bea-blue bg-bea-blue/10">
              <GraduationCap size={32} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-bea-text-strong mb-1">{edu.degree}</h3>
              <p className="text-lg text-bea-blue mb-2">{edu.school}</p>
              <p className="text-bea-text-secondary text-sm">{edu.period}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
