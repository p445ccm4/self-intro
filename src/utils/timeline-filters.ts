import type { Category } from './timeline';

export type TimelineFilter = Exclude<Category, 'milestone'> | 'all';

export const TIMELINE_FILTERS = [
  { id: 'all' as const, label: 'All' },
  { id: 'work' as const, label: 'Work' },
  { id: 'project' as const, label: 'Project' },
  { id: 'education' as const, label: 'Education' },
];

export const getTimelineFilterIndex = (filter: TimelineFilter): number => {
  const index = TIMELINE_FILTERS.findIndex((item) => item.id === filter);
  return index < 0 ? 0 : index;
};
