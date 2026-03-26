import type { TimelineItem } from '../utils/timeline';
import { SPINE_LAYOUT, getConnectorColor } from '../utils/timeline-theme';

export interface TimelineLayoutProps {
  items: TimelineItem[];
  minDate: Date;
  maxDate: Date;
  totalHeight: number;
  sortOrder: 'asc' | 'desc';
  laneCount: number;
  containerWidth: number;
  containerHeight: number;
  cardDimensions: Map<string, { width: number; height: number; offsetLeft: number; offsetTop: number }>;
}

export interface ConnectorPath {
  id: string;
  d: string;
  color: string;
}

export const calculateTimelineLayout = ({
  items,
  minDate,
  maxDate,
  totalHeight,
  sortOrder,
  laneCount,
  containerWidth,
  containerHeight,
  cardDimensions,
}: TimelineLayoutProps) => {
  const totalDuration = maxDate.getTime() - minDate.getTime();
  
  // 1. Calculate Spacers
  const cardSpacers = new Map<string, number>();
  let currentStackY = 0;

  items.forEach((item) => {
    const dims = cardDimensions.get(item.id);
    if (!dims) return;

    const cardHeight = dims.height;
    const endDate = item.endDate === 'Present' ? new Date() : item.endDate;

    let timePercent;
    if (sortOrder === 'desc') {
      timePercent = (maxDate.getTime() - endDate.getTime()) / totalDuration;
    } else {
      timePercent = (item.startDate.getTime() - minDate.getTime()) / totalDuration;
    }

    const idealY = Math.max(0, Math.min(1, timePercent)) * totalHeight;
    const targetY = Math.max(idealY, currentStackY);
    const marginTop = Math.max(0, targetY - currentStackY);
    
    cardSpacers.set(item.id, marginTop);
    currentStackY = targetY + cardHeight;
  });

  // 2. Calculate Paths
  const { LANE_WIDTH, LANE_GAP } = SPINE_LAYOUT;
  const totalSpineWidth = laneCount * LANE_WIDTH + (laneCount - 1) * LANE_GAP;
  const centerX = containerWidth / 2;

  const connectorPaths = items
    .map((item) => {
      const dims = cardDimensions.get(item.id);
      if (!dims) return null;

      const isLeft = item.category === 'work' || item.category === 'education';
      const startX = isLeft ? dims.offsetLeft + dims.width : dims.offsetLeft;
      const startY = dims.offsetTop + dims.height / 2;

      const endDate = item.endDate === 'Present' ? new Date() : item.endDate;
      const startDate = item.startDate;

      let pillTop, pillBottom;
      if (sortOrder === 'desc') {
        const topPercent = (maxDate.getTime() - endDate.getTime()) / totalDuration;
        const bottomPercent = (maxDate.getTime() - startDate.getTime()) / totalDuration;
        pillTop = Math.max(0, Math.min(1, topPercent)) * containerHeight;
        pillBottom = Math.max(0, Math.min(1, bottomPercent)) * containerHeight;
      } else {
        const topPercent = (startDate.getTime() - minDate.getTime()) / totalDuration;
        const bottomPercent = (endDate.getTime() - minDate.getTime()) / totalDuration;
        pillTop = Math.max(0, Math.min(1, topPercent)) * containerHeight;
        pillBottom = Math.max(0, Math.min(1, bottomPercent)) * containerHeight;
      }

      const endY = Math.max(pillTop, Math.min(pillBottom, startY));
      const laneIndex = item.lane || 0;
      const laneOffset = -totalSpineWidth / 2 + laneIndex * (LANE_WIDTH + LANE_GAP) + LANE_WIDTH / 2;
      const endX = centerX + laneOffset;

      const midX = (startX + endX) / 2;
      const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

      return {
        id: item.id,
        d: path,
        color: getConnectorColor(item.category) || '#9ca3af',
      };
    })
    .filter((p): p is ConnectorPath => p !== null);

  return { cardSpacers, connectorPaths };
};
