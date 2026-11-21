import { Briefcase, Code, GraduationCap, Clock, ArrowDown, ArrowUp } from 'lucide-react';
import type { Category } from '../utils/timeline';
import {
  getTimelineFilterIndex,
  TIMELINE_FILTERS,
  type TimelineFilter,
} from '../utils/timeline-filters';

interface TimelineSettingsProps {
  filter: Exclude<Category, 'milestone'> | 'all';
  onFilterChange: (filter: Exclude<Category, 'milestone'> | 'all') => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;
}

const FILTER_ICONS = {
  all: Clock,
  work: Briefcase,
  project: Code,
  education: GraduationCap,
} as const;

export const TimelineSettings = ({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
}: TimelineSettingsProps) => {
  const filterIndex = getTimelineFilterIndex(filter as TimelineFilter);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="journey-toggle" role="group" aria-label="Filter timeline">
        <span
          className="journey-toggle-thumb"
          style={{ transform: `translateX(${filterIndex * 100}%)` }}
          aria-hidden
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
              {label}
            </button>
          );
        })}
      </div>

      <button type="button" onClick={onSortChange} className="btn btn-sm btn-glass">
        {sortOrder === 'desc' ? <ArrowDown size={14} aria-hidden /> : <ArrowUp size={14} aria-hidden />}
        <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
      </button>
    </div>
  );
};
