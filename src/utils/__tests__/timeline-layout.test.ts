import { describe, it, expect } from 'vitest';
import { calculateTimelineLayout } from '../timeline-layout';
import type { TimelineItem } from '../timeline';

describe('calculateTimelineLayout', () => {
  const mockItems: TimelineItem[] = [
    {
      id: '1',
      category: 'work',
      title: 'Job 1',
      subtitle: 'Company 1',
      startDate: new Date('2020-01-01'),
      endDate: new Date('2021-01-01'),
      dateString: '2020 - 2021',
      lane: 0,
    },
  ];

  const minDate = new Date('2020-01-01');
  const maxDate = new Date('2022-01-01');
  const totalHeight = 1000;

  it('calculates spacers correctly', () => {
    const cardDimensions = new Map([
      ['1', { width: 300, height: 200, offsetLeft: 50, offsetTop: 100 }],
    ]);

    const result = calculateTimelineLayout({
      items: mockItems,
      minDate,
      maxDate,
      totalHeight,
      sortOrder: 'desc',
      laneCount: 2,
      containerWidth: 1000,
      containerHeight: 1000,
      cardDimensions,
    });

    expect(result.cardSpacers.has('1')).toBe(true);
    expect(result.cardSpacers.get('1')).toBeGreaterThanOrEqual(0);
  });

  it('leaves a gap between stacked cards that would otherwise collide', () => {
    const stackedItems: TimelineItem[] = [
      {
        id: 'a',
        category: 'project',
        title: 'A',
        subtitle: 'Self',
        startDate: new Date('2026-11-01'),
        endDate: new Date('2026-11-01'),
        dateString: 'November 2026',
        lane: 0,
      },
      {
        id: 'b',
        category: 'project',
        title: 'B',
        subtitle: 'Self',
        startDate: new Date('2026-11-01'),
        endDate: new Date('2026-11-01'),
        dateString: 'November 2026',
        lane: 0,
      },
    ];

    const cardDimensions = new Map([
      ['a', { width: 300, height: 180, offsetLeft: 500, offsetTop: 0 }],
      ['b', { width: 300, height: 180, offsetLeft: 500, offsetTop: 180 }],
    ]);

    const result = calculateTimelineLayout({
      items: stackedItems,
      minDate: new Date('2026-01-01'),
      maxDate: new Date('2026-12-01'),
      totalHeight: 400,
      sortOrder: 'desc',
      laneCount: 1,
      containerWidth: 1000,
      containerHeight: 400,
      cardDimensions,
    });

    // First card sits on its time position; second gets a 16px flow gap when stacked
    expect(result.cardSpacers.get('b')).toBe(16);
  });

  it('calculates connector paths correctly', () => {
    const cardDimensions = new Map([
      ['1', { width: 300, height: 200, offsetLeft: 50, offsetTop: 100 }],
    ]);

    const result = calculateTimelineLayout({
      items: mockItems,
      minDate,
      maxDate,
      totalHeight,
      sortOrder: 'desc',
      laneCount: 2,
      containerWidth: 1000,
      containerHeight: 1000,
      cardDimensions,
    });

    expect(result.connectorPaths.length).toBe(1);
    expect(result.connectorPaths[0].id).toBe('1');
    expect(result.connectorPaths[0].d).toContain('M');
  });
});
