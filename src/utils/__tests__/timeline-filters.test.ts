import { describe, expect, it } from 'vitest';
import { getTimelineFilterIndex, TIMELINE_FILTERS } from '../timeline-filters';

describe('timeline filters', () => {
  it('lists all / work / project / education in order', () => {
    expect(TIMELINE_FILTERS.map((f) => f.id)).toEqual([
      'all',
      'work',
      'project',
      'education',
    ]);
  });

  it('maps each filter id to a stable thumb index', () => {
    expect(getTimelineFilterIndex('all')).toBe(0);
    expect(getTimelineFilterIndex('work')).toBe(1);
    expect(getTimelineFilterIndex('project')).toBe(2);
    expect(getTimelineFilterIndex('education')).toBe(3);
  });

  it('falls back to 0 for unknown filters', () => {
    expect(getTimelineFilterIndex('milestone' as never)).toBe(0);
  });
});
