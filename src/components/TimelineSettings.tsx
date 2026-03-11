import { Briefcase, Code, GraduationCap, Clock, ArrowDown, ArrowUp } from 'lucide-react';
import type { Category } from '../utils/timeline';

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
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
            filter === cat
              ? 'bg-gray-800 text-white border-gray-600 shadow-lg shadow-blue-500/10'
              : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50'
          }`}
        >
          {cat === 'all' && <Clock size={14} />}
          {cat === 'work' && <Briefcase size={14} />}
          {cat === 'project' && <Code size={14} />}
          {cat === 'education' && <GraduationCap size={14} />}
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}

      <div className="w-px h-8 bg-gray-800 mx-2 hidden sm:block" />

      <button
        onClick={onSortChange}
        className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border bg-transparent text-gray-400 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
      >
        {sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
        {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
      </button>
    </div>
  );
};

