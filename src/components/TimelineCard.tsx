import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { TimelineItem } from '../utils/timeline';
import { getCategoryColor, getIcon, getPillColor } from '../utils/timeline-theme';

interface TimelineCardProps {
  item: TimelineItem;
  isLeftTrack: boolean;
  spacerHeight: number;
  cardRef: (el: HTMLDivElement | null) => void;
  setHoveredItemId: (id: string | null) => void;
  hoveredItemId: string | null;
}

export const TimelineCard = ({ item, isLeftTrack, spacerHeight, cardRef, setHoveredItemId, hoveredItemId }: TimelineCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{ '--spacer-height': `${spacerHeight}px` } as React.CSSProperties}
      className={`relative md:flex items-center mt-0 md:mt-[var(--spacer-height)] pointer-events-none ${
        isLeftTrack ? 'justify-start md:pr-[50%]' : 'justify-end md:pl-[50%]'
      }`}
    >
      {/* Mobile Dot */}
      <div className={`md:hidden absolute left-6 w-3 h-3 rounded-full transform -translate-x-1/2 mt-6 z-10 border-2 border-gray-900 ${getPillColor(item.category)}`} />

      {/* Content Card */}
      <div className={`w-full pl-12 md:pl-0 md:text-left ${
        isLeftTrack ? 'md:pr-24' : 'md:pl-24'
      }`}>
        <motion.div
          ref={cardRef}
          whileHover={{ y: -4 }}
          className={`group relative bg-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border transition-all cursor-pointer overflow-hidden pointer-events-auto ${
            hoveredItemId === item.id ? 'border-gray-600 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-gray-800 hover:border-gray-700'
          }`}
          onClick={() => item.link && navigate(item.link)}
          onMouseEnter={() => setHoveredItemId(item.id)}
          onMouseLeave={() => setHoveredItemId(null)}
        >
          {/* Hover Gradient Background */}
          <div className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-br ${
            hoveredItemId === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          } ${
            item.category === 'work' ? 'from-blue-500/5 via-transparent to-transparent' :
            item.category === 'project' ? 'from-purple-500/5 via-transparent to-transparent' :
            'from-green-500/5 via-transparent to-transparent'
          }`} />

          <div className="flex flex-col md:items-start">
            {/* Header: Date & Duration */}
            <div className="flex items-center gap-3 text-xs font-mono text-gray-500 mb-2">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {item.dateString}
              </span>
              {item.duration && (
                <span className={`px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700/50`}>
                  {item.duration}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <h3 className={`text-lg font-bold transition-colors flex items-center gap-2 ${
              hoveredItemId === item.id ? 'text-blue-400' : 'text-white group-hover:text-blue-400'
            }`}>
              {item.title}
              {item.link && (
                <ChevronRight
                  size={16}
                  className={`transition-all ${
                    hoveredItemId === item.id
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                />
              )}
            </h3>
            <div className={`flex items-center gap-2 mt-1 ${
              item.category === 'work' ? 'text-blue-300' :
              item.category === 'project' ? 'text-purple-300' : 'text-green-300'
            }`}>
              <span className="text-sm font-medium">{item.subtitle}</span>
            </div>

            {/* Description */}
            {item.description && (
              <div className="mt-4 text-gray-400 text-sm leading-relaxed line-clamp-3 md:text-left">
                {Array.isArray(item.description) ? (
                  <ul className="space-y-1 list-disc list-inside">
                    {item.description.slice(0, 2).map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.description}</p>
                )}
              </div>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 md:justify-start">
                {item.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 bg-gray-800/50 rounded-md text-gray-500 border border-gray-700/30">
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 text-gray-600">+{item.tags.length - 3}</span>
                )}
              </div>
            )}
            
            {/* Category Icon Badge (Absolute positioned) */}
            <div className={`absolute top-4 right-4 md:right-4 p-2 rounded-lg ${getCategoryColor(item.category)}`}>
              {getIcon(item.category)}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
