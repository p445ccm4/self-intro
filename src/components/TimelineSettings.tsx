import { motion } from 'framer-motion';
import { Briefcase, Code, GraduationCap, Clock } from 'lucide-react';
import type { Category } from '../utils/timeline';
import {
  getTimelineFilterIndex,
  TIMELINE_FILTERS,
  type TimelineFilter,
} from '../utils/timeline-filters';

interface TimelineSettingsProps {
  filter: Exclude<Category, 'milestone'> | 'all';
  onFilterChange: (filter: Exclude<Category, 'milestone'> | 'all') => void;
}

const FILTER_ICONS = {
  all: Clock,
  work: Briefcase,
  project: Code,
  education: GraduationCap,
} as const;

export const TimelineSettings = ({ filter, onFilterChange }: TimelineSettingsProps) => {
  const filterIndex = getTimelineFilterIndex(filter as TimelineFilter);

  return (
    <div className="journey-toggle" role="group" aria-label="Filter timeline">
      <motion.span
        className="journey-toggle-thumb"
        aria-hidden
        initial={false}
        animate={{ x: `${filterIndex * 100}%` }}
        transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.6 }}
      />
      {TIMELINE_FILTERS.map(({ id, label }) => {
        const Icon = FILTER_ICONS[id];
        return (
          <button
            key={id}
            type="button"
            className="journey-toggle-btn"
            aria-pressed={filter === id}
            onClick={() => onFilterChange(id)}
          >
            <Icon size={14} aria-hidden />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
