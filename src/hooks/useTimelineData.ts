import { useMemo } from 'react';
import { portfolioData } from '../data/portfolio';
import {
  type TimelineItem,
  type Category,
  parsePeriod,
  calculateDuration,
  assignLanes,
  getTimelineRange,
  parseDateStr
} from '../utils/timeline';

export const useTimelineData = (filter: Exclude<Category, 'milestone'> | 'all') => {
  const { items, minDate, maxDate, laneCount } = useMemo(() => {
    const { experience, projects, education, milestones } = portfolioData;

    const workItems: TimelineItem[] = experience.map(job => {
      const { start, end } = parsePeriod(job.period);
      return {
        id: `work-${job.id}`,
        category: 'work',
        title: job.role,
        subtitle: job.company,
        startDate: start,
        endDate: end,
        dateString: job.period,
        duration: calculateDuration(start, end),
        description: job.description,
        tags: [],
        link: `/experience/${job.id}`
      };
    });

    const projectItems: TimelineItem[] = projects.map(proj => {
      const dateStr = proj.period || '';
      const { start, end } = parsePeriod(dateStr);
      return {
        id: `proj-${proj.id}`,
        category: 'project',
        title: proj.title,
        subtitle: proj.company,
        startDate: start,
        endDate: end,
        dateString: dateStr,
        // Only show duration if it's a range (period contains separator)
        duration: new RegExp(/[–-]/).exec(dateStr) ? calculateDuration(start, end) : undefined,
        description: proj.description,
        tags: proj.tech,
        link: `/project/${proj.id}`
      };
    });

    const eduItems: TimelineItem[] = education.map(edu => {
      const { start, end } = parsePeriod(edu.period);
      return {
        id: `edu-${edu.id}`,
        category: 'education',
        title: edu.degree,
        subtitle: edu.school,
        startDate: start,
        endDate: end,
        dateString: edu.period,
        duration: calculateDuration(start, end),
        description: [],
        tags: [],
        link: `/education/${edu.id}`
      };
    });

    const milestoneItems: TimelineItem[] = (milestones || []).map(m => ({
      id: m.id,
      category: 'milestone',
      title: m.title,
      subtitle: m.subtitle,
      startDate: parseDateStr(m.date),
      endDate: parseDateStr(m.date),
      dateString: m.date,
      description: m.description,
      tags: m.tags,
    }));

    const allItems = [...workItems, ...projectItems, ...eduItems, ...milestoneItems];
    
    // Assign lanes
    const { items: lanedItems, laneCount } = assignLanes(allItems);
    
    // Calculate global range
    const { min, max } = getTimelineRange(lanedItems);

    // Sort by End Date Descending (Visual Top first) for the card list
    const sortedItems = lanedItems.sort((a, b) => {
      const endA = a.endDate === 'Present' ? new Date() : a.endDate;
      const endB = b.endDate === 'Present' ? new Date() : b.endDate;
      
      const diff = endB.getTime() - endA.getTime();
      if (diff !== 0) return diff;
      
      // If end dates are same, sort by start date (Newest start first)
      return b.startDate.getTime() - a.startDate.getTime();
    });

    return { items: sortedItems, minDate: min, maxDate: max, laneCount };
  }, []);

  // Filter logic: Milestones are ALWAYS included.
  const filteredItems = useMemo(() => items.filter(item =>
    item.category === 'milestone' || filter === 'all' || item.category === filter
  ), [items, filter]);

  // Calculate optimal height based on item density
  const totalHeight = useMemo(() => {
    if (filteredItems.length === 0) return 0;

    const itemsByYear: Record<number, number> = {};
    filteredItems.forEach(item => {
      const year = item.startDate.getFullYear();
      itemsByYear[year] = (itemsByYear[year] || 0) + 1;
    });

    const maxDensity = Math.max(...Object.values(itemsByYear));
    const yearSpan = (maxDate.getFullYear() - minDate.getFullYear()) + 1;
    
    // 350px per item allows enough space for the card + gap
    const pixelsPerYear = Math.max(maxDensity * 350, 400);
    
    // Ensure minimum height to prevent milestone overlap when filtered
    const minTotalHeight = filteredItems.length * 300;

    return Math.max(yearSpan * pixelsPerYear, minTotalHeight);
  }, [filteredItems, maxDate, minDate]);

  return {
    items: filteredItems,
    minDate,
    maxDate,
    laneCount,
    totalHeight
  };
};
