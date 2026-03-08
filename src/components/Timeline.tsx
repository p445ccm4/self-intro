import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Code, Calendar, ChevronRight, Filter } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useNavigate } from 'react-router-dom';

type Category = 'work' | 'project' | 'education';

interface TimelineItem {
  id: string | number;
  category: Category;
  title: string;
  subtitle: string;
  date: string;
  sortDate: number;
  description?: string | string[];
  tags?: string[];
  link?: string;
}

const parseDate = (dateStr: string): number => {
  const lower = dateStr.toLowerCase();
  if (lower.includes('now') || lower.includes('present')) return Date.now();
  
  // Handle "Month Year" or "Year"
  // If range "Start - End", take Start
  const parts = dateStr.split('–').map(s => s.trim()); // Note: portfolio uses en-dash '–'
  const startDate = parts[0];

  // Try parsing "Month Year"
  const parsed = Date.parse(startDate);
  if (!Number.isNaN(parsed)) return parsed;

  // Try parsing "Year"
  const yearParsed = Date.parse(`${startDate}-01-01`);
  if (!Number.isNaN(yearParsed)) return yearParsed;

  return 0;
};

export const Timeline = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Category | 'all'>('all');

  const items: TimelineItem[] = useMemo(() => {
    const { experience, projects, education } = portfolioData;

    const workItems: TimelineItem[] = experience.map(job => ({
      id: `work-${job.id}`,
      category: 'work',
      title: job.role,
      subtitle: job.company,
      date: job.period,
      sortDate: parseDate(job.period),
      description: job.description,
      tags: [],
      link: `/project/work-${job.id}`
    }));

    const projectItems: TimelineItem[] = projects.map(proj => ({
      id: `proj-${proj.id}`,
      category: 'project',
      title: proj.title,
      subtitle: proj.company,
      date: proj.year,
      sortDate: parseDate(proj.year),
      description: proj.description,
      tags: proj.tech,
      link: `/project/${proj.id}`
    }));

    const eduItems: TimelineItem[] = education.map(edu => ({
      id: `edu-${edu.school}-${edu.degree}`,
      category: 'education',
      title: edu.degree,
      subtitle: edu.school,
      date: edu.period,
      sortDate: parseDate(edu.period),
      description: [],
      tags: [],
      link: `/project/edu-${edu.school}-${edu.degree}`
    }));

    return [...workItems, ...projectItems, ...eduItems].sort((a, b) => b.sortDate - a.sortDate);
  }, []);

  const filteredItems = items.filter(item => filter === 'all' || item.category === filter);

  const getIcon = (category: Category) => {
    switch (category) {
      case 'work': return <Briefcase size={20} />;
      case 'project': return <Code size={20} />;
      case 'education': return <GraduationCap size={20} />;
    }
  };

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'work': return 'bg-blue-500';
      case 'project': return 'bg-purple-500';
      case 'education': return 'bg-green-500';
    }
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-6">My Journey</h2>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {(['all', 'work', 'project', 'education'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                filter === cat 
                  ? 'bg-white text-gray-900 shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {cat === 'all' && <Filter size={14} />}
              {cat === 'work' && <Briefcase size={14} />}
              {cat === 'project' && <Code size={14} />}
              {cat === 'education' && <GraduationCap size={14} />}
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        {/* Desktop: Center */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 transform -translate-x-1/2" />
        {/* Mobile: Left side */}
        <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800" />

        <div className="space-y-12">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 mt-6 z-10 border-4 border-gray-900 shadow-[0_0_10px_rgba(0,0,0,0.5)] ${getCategoryColor(item.category)}`} />

                  {/* Date Display (Desktop Only - Opposite Side) */}
                  <div className={`hidden md:flex w-1/2 ${
                    isEven ? 'justify-start pl-12' : 'justify-end pr-12'
                  } items-center mt-6`}>
                    <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                      <Calendar size={14} />
                      {item.date}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${
                    isEven ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all group cursor-pointer relative overflow-hidden`}
                      onClick={() => item.link && navigate(item.link)}
                    >
                      {/* Hover Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${
                        item.category === 'work' ? 'from-blue-500/5' : 
                        item.category === 'project' ? 'from-purple-500/5' : 'from-green-500/5'
                      } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      {/* Mobile Date */}
                      <div className="md:hidden flex items-center gap-2 text-gray-500 font-mono text-xs mb-3">
                        <Calendar size={12} />
                        {item.date}
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className={`text-xl font-bold text-white group-hover:text-blue-400 transition-colors`}>
                              {item.title}
                            </h3>
                            <p className={`text-sm font-medium ${
                              item.category === 'work' ? 'text-blue-300' : 
                              item.category === 'project' ? 'text-purple-300' : 'text-green-300'
                            }`}>
                              {item.subtitle}
                            </p>
                          </div>
                          <div className={`p-2 rounded-lg bg-gray-900/50 ${
                            item.category === 'work' ? 'text-blue-400' : 
                            item.category === 'project' ? 'text-purple-400' : 'text-green-400'
                          }`}>
                            {getIcon(item.category)}
                          </div>
                        </div>

                        {item.description && (
                          <div className="text-gray-400 text-sm mb-4 line-clamp-3">
                            {Array.isArray(item.description) ? (
                              <ul className="list-disc list-inside space-y-1">
                                {item.description.slice(0, 2).map((desc, i) => (
                                  <li key={i}>{desc}</li>
                                ))}
                              </ul>
                            ) : (
                              <p>{item.description}</p>
                            )}
                          </div>
                        )}

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {item.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-gray-900/50 rounded text-gray-500 border border-gray-700/30">
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="text-xs px-2 py-1 text-gray-600">+{item.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                        
                        {item.link && (
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                            <ChevronRight className="text-blue-400" size={20} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
