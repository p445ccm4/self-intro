import { Briefcase, Code, GraduationCap, Clock, ArrowDown, ArrowUp } from 'lucide-react';
import type { Category } from '../utils/timeline';
import { cn } from '../utils/cn';

interface TimelineSettingsProps {
  filter: Exclude<Category, 'milestone'> | 'all';
  onFilterChange: (filter: Exclude<Category, 'milestone'> | 'all') => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;
}

export const TimelineSettings = ({ filter, onFilterChange, sortOrder, onSortChange }: TimelineSettingsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {(['all', 'work', 'project', 'education'] as const).map((cat) => (
        <button
          key={cat}
          onClick={() => onFilterChange(cat)}
          className={cn(
            'btn btn-sm',
            filter === cat ? 'btn-primary' : 'btn-secondary'
          )}
        >
          {cat === 'all' && <Clock size={14} />}
          {cat === 'work' && <Briefcase size={14} />}
          {cat === 'project' && <Code size={14} />}
          {cat === 'education' && <GraduationCap size={14} />}
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}

      <div className="w-px h-8 bg-bea-border mx-2 hidden sm:block self-center" />

      <button
        onClick={onSortChange}
        className="btn btn-sm btn-secondary"
      >
        {sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
        {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
      </button>
    </div>
  );
};
