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
