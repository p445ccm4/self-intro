export type Category = 'work' | 'project' | 'education' | 'milestone';

export interface TimelineItem {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  startDate: Date;
  endDate: Date | 'Present';
  dateString: string;
  duration?: string;
  description?: string | string[];
  tags?: string[];
  link?: string;
  lane?: number; // Assigned lane index
}

// Helper: Parse a single date string
export const parseDateStr = (dateStr: string): Date => {
  const lower = dateStr.trim().toLowerCase();
  if (lower === 'now' || lower === 'present') return new Date();
  
  // Try parsing "Month Year" or full date
  const parsed = Date.parse(dateStr);
  if (!Number.isNaN(parsed)) return new Date(parsed);
  
  // Handle "Year" only (e.g., "2026")
  if (/^\d{4}$/.test(dateStr)) return new Date(`${dateStr}-01-01`);
  
  return new Date(0); // Fallback
};

// Helper: Parse period string "Start - End" or "Date"
export const parsePeriod = (period: string): { start: Date; end: Date | 'Present' } => {
  // Handle en-dash '–' and hyphen '-'
  const parts = period.split(/[–-]/).map(s => s.trim());
  
  if (parts.length >= 2) {
    const start = parseDateStr(parts[0]);
    const endStr = parts[1];
    const end = (endStr.toLowerCase() === 'now' || endStr.toLowerCase() === 'present')
      ? 'Present'
      : parseDateStr(endStr);
    return { start, end };
  }
  
  // Single date
  const date = parseDateStr(period);
  return { start: date, end: date }; // Point in time
};

// Helper: Calculate duration string
export const calculateDuration = (start: Date, end: Date | 'Present') => {
  const endDate = end === 'Present' ? new Date() : end;
  
  let months = (endDate.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += endDate.getMonth();
  
  // Ensure at least 1 month if dates are close but not identical
  if (months <= 0) months = 0; 
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (remainingMonths > 0) parts.push(`${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`);
  
  return parts.length > 0 ? parts.join(' ') : '1 mo';
};

export const getTimelineRange = (items: TimelineItem[]) => {
  if (items.length === 0) return { min: new Date(), max: new Date() };

  let min = new Date();
  let max = new Date(0);

  items.forEach(item => {
    if (item.startDate < min) min = item.startDate;
    const end = item.endDate === 'Present' ? new Date() : item.endDate;
    if (end > max) max = end;
  });

  // Add some padding? Maybe not needed for pure calculation, can be done in UI.
  return { min, max };
};

export const assignLanes = (items: TimelineItem[]): { items: TimelineItem[], laneCount: number } => {
  // Sort by start date
  const sortedItems = [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  
  const lanes: Date[] = []; // Stores the end date of the last item in each lane
  const processedItems: TimelineItem[] = [];

  sortedItems.forEach(item => {
    let assignedLane = -1;
    const itemStart = item.startDate;
    const itemEnd = item.endDate === 'Present' ? new Date() : item.endDate;

    // Find the first lane where this item fits
    for (let i = 0; i < lanes.length; i++) {
      // If the lane's last item ends before this item starts (with some buffer maybe?)
      // Let's assume strict non-overlap for now.
      if (lanes[i] < itemStart) {
        assignedLane = i;
        lanes[i] = itemEnd;
        break;
      }
    }

    // If no lane found, create a new one
    if (assignedLane === -1) {
      assignedLane = lanes.length;
      lanes.push(itemEnd);
    }

    processedItems.push({ ...item, lane: assignedLane });
  });

  // Re-sort back to original order if needed?
  // The prompt says "Keep the content cards stacked sequentially (Work/Edu on left, Projects on right) as they are now".
  // The original code sorts by Start Date Descending (Newest first).
  // So we should probably return them in the order the UI expects, or let the UI sort them.
  // The UI currently does: return allItems.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  
  // Let's return the processed items, the UI can re-sort them for display list if needed,
  // but for the spine rendering, we might need them in a specific order or just use the lane index.
  
  return { items: processedItems, laneCount: lanes.length };
};

export const SPINE_LAYOUT = {
  LANE_WIDTH: 6,
  LANE_GAP: 8,
};
