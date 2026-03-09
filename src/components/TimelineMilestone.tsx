import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import type { TimelineItem } from '../utils/timeline';

interface TimelineMilestoneProps {
  item: TimelineItem;
  spacerHeight: number;
  cardRef?: (el: HTMLDivElement | null) => void;
  setHoveredItemId: (id: string | null) => void;
}

export const TimelineMilestone = ({ item, spacerHeight, cardRef, setHoveredItemId }: TimelineMilestoneProps) => {
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{ marginTop: spacerHeight }}
      className="relative md:flex items-center justify-center w-full"
    >
      <div
        className="relative z-10 flex flex-col items-center max-w-md text-center px-4 py-6"
        onMouseEnter={() => setHoveredItemId(item.id)}
        onMouseLeave={() => setHoveredItemId(null)}
      >
        <div className="relative bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:border-yellow-500/50 transition-all group cursor-default">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent rounded-2xl opacity-50" />
          
          <div className="relative flex flex-col items-center">
            <div className="px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-bold text-xs mb-3 flex items-center gap-2">
              <Zap size={14} className="fill-yellow-400" />
              MILESTONE
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1 text-center">{item.title}</h3>
            <div className="text-yellow-200/80 text-sm font-medium mb-3">{item.subtitle}</div>
            <div className="text-gray-500 text-xs font-mono mb-4">{item.dateString}</div>
            
            {item.description && (
              <p className="text-gray-400 text-sm leading-relaxed text-center">
                {Array.isArray(item.description) ? item.description.join(' ') : item.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
