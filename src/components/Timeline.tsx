import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import type { Category } from '../utils/timeline';
import { SPINE_LAYOUT , getConnectorColor } from '../utils/timeline-theme';
import { TimelineSpine } from './TimelineSpine';
import { useTimelineData } from '../hooks/useTimelineData';
import { TimelineSettings } from './TimelineSettings';
import { TimelineCard } from './TimelineCard';

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [connectorPaths, setConnectorPaths] = useState<{ id: string; d: string; color: string }[]>([]);
  const [cardSpacers, setCardSpacers] = useState<Map<string, number>>(new Map());
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const isSortingRef = useRef(false);

  // Filter now excludes milestones (they are always shown)
  const [filter, setFilter] = useState<Exclude<Category, 'milestone'> | 'all'>('all');
  const location = useLocation();
  const navigate = useNavigate();

  const { items: filteredItems, minDate, maxDate, laneCount, totalHeight } = useTimelineData(filter, sortOrder);

  // Handle scroll restoration from DetailPage
  useEffect(() => {
    // If we are sorting, ignore the scroll restoration for this update
    if (isSortingRef.current) {
      isSortingRef.current = false;
      return;
    }

    if (location.hash && cardSpacers.size > 0) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure layout is stable
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [location.hash, cardSpacers]);

  // Calculate spacers to align cards with time
  useEffect(() => {
    const calculateSpacers = () => {
      if (!containerRef.current) return;
      
      const totalDuration = maxDate.getTime() - minDate.getTime();
      const newSpacers = new Map<string, number>();
      let currentStackY = 0; // Tracks the bottom of the previous card

      filteredItems.forEach((item) => {
        const cardEl = cardRefs.current.get(item.id);
        if (!cardEl) {
          return;
        }

        const cardHeight = cardEl.offsetHeight;

        // Calculate ideal time-based Y position
        const endDate = item.endDate === 'Present' ? new Date() : item.endDate;
        
        let timePercent;
        if (sortOrder === 'desc') {
          // Descending: Align to End Date (Newest at top)
          timePercent = (maxDate.getTime() - endDate.getTime()) / totalDuration;
        } else {
          // Ascending: Align to Start Date (Oldest at top)
          timePercent = (item.startDate.getTime() - minDate.getTime()) / totalDuration;
        }

        const idealY = Math.max(0, Math.min(1, timePercent)) * totalHeight;

        // Align card top with the time point (idealY)
        // Previously we centered milestones, but this caused them to appear "in the future" (higher up)
        // relative to their date, confusing the year markers.
        let targetY = idealY;

        // Ensure we don't overlap with previous content
        const stackedY = Math.max(targetY, currentStackY);
        
        targetY = stackedY;
        
        const marginTop = Math.max(0, targetY - currentStackY);
        newSpacers.set(item.id, marginTop);

        // Update stack pointer
        currentStackY = targetY + cardHeight;
      });

      setCardSpacers(newSpacers);
    };

    // Run calculation
    calculateSpacers();
    
    // Re-run on resize
    window.addEventListener('resize', calculateSpacers);

    // Observe card resizes
    const observer = new ResizeObserver(() => {
      calculateSpacers();
    });

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('resize', calculateSpacers);
      observer.disconnect();
    };
  }, [filteredItems, maxDate, minDate, totalHeight, sortOrder]);

  useEffect(() => {
    const updatePaths = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const { LANE_WIDTH, LANE_GAP } = SPINE_LAYOUT;
      const totalSpineWidth = laneCount * LANE_WIDTH + (laneCount - 1) * LANE_GAP;
      const centerX = containerRect.width / 2;
      const totalDuration = maxDate.getTime() - minDate.getTime();

      const newPaths = filteredItems.map(item => {
        const cardEl = cardRefs.current.get(item.id);
        if (!cardEl) return null;

        // Calculate position relative to container using offsetParent to ignore transforms
        let currentEl: HTMLElement | null = cardEl;
        let relativeLeft = 0;
        let relativeTop = 0;

        while (currentEl && currentEl !== containerRef.current) {
          relativeLeft += currentEl.offsetLeft;
          relativeTop += currentEl.offsetTop;
          currentEl = currentEl.offsetParent as HTMLElement;
        }

        const isLeft = item.category === 'work' || item.category === 'education';

        // Card Point (relative to container)
        const startX = isLeft
          ? relativeLeft + cardEl.offsetWidth
          : relativeLeft;
        
        const startY = relativeTop + cardEl.offsetHeight / 2;

        // Pill Point
        const endDate = item.endDate === 'Present' ? new Date() : item.endDate;
        const startDate = item.startDate;
        
        let pillTop, pillBottom;

        if (sortOrder === 'desc') {
          // Descending: Top is End Date, Bottom is Start Date
          const topPercent = (maxDate.getTime() - endDate.getTime()) / totalDuration;
          const bottomPercent = (maxDate.getTime() - startDate.getTime()) / totalDuration;
          
          pillTop = Math.max(0, Math.min(1, topPercent)) * containerRect.height;
          pillBottom = Math.max(0, Math.min(1, bottomPercent)) * containerRect.height;
        } else {
          // Ascending: Top is Start Date, Bottom is End Date
          const topPercent = (startDate.getTime() - minDate.getTime()) / totalDuration;
          const bottomPercent = (endDate.getTime() - minDate.getTime()) / totalDuration;

          pillTop = Math.max(0, Math.min(1, topPercent)) * containerRect.height;
          pillBottom = Math.max(0, Math.min(1, bottomPercent)) * containerRect.height;
        }

        // Clamp connection point to be within the pill's vertical range
        // Note: In SVG coords, pillTop is numerically smaller than pillBottom
        const endY = Math.max(pillTop, Math.min(pillBottom, startY));

        const laneIndex = item.lane || 0;
        const laneOffset = -totalSpineWidth / 2 + laneIndex * (LANE_WIDTH + LANE_GAP) + LANE_WIDTH / 2;
        const endX = centerX + laneOffset;

        // Bezier Curve
        const midX = (startX + endX) / 2;
        const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

        return {
          id: item.id,
          d: path,
          color: getConnectorColor(item.category) || '#9ca3af'
        };
      }).filter((p): p is { id: string; d: string; color: string } => p !== null);

      setConnectorPaths(newPaths);
    };

    // Update paths whenever spacers change (as cards move)
    updatePaths();
    
    const timer = setTimeout(updatePaths, 500);
    return () => clearTimeout(timer);
  }, [filteredItems, maxDate, minDate, laneCount, cardSpacers, sortOrder]);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto relative overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          My Journey
        </h2>
        
        <div className="flex flex-col items-center gap-4">
          <TimelineSettings
            filter={filter}
            onFilterChange={setFilter}
            sortOrder={sortOrder}
            onSortChange={() => {
              isSortingRef.current = true;
              setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
              if (location.hash) {
                navigate(location.pathname, { replace: true });
              }
            }}
          />
        </div>
      </div>

      <div className="relative h-auto md:h-[var(--total-height)]" ref={containerRef} style={{ '--total-height': `${totalHeight}px` } as React.CSSProperties}>
        {/* Connector Lines (Desktop) */}
        <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
          {connectorPaths.map(p => (
            <path
              key={p.id}
              d={p.d}
              stroke={p.color}
              strokeWidth="1.5"
              fill="none"
              opacity="0.3"
            />
          ))}
        </svg>

        {/* Central Spine (Desktop) - Multi-lane */}
        <TimelineSpine
          items={filteredItems}
          minDate={minDate}
          maxDate={maxDate}
          laneCount={laneCount}
          hoveredItemId={hoveredItemId}
          setHoveredItemId={setHoveredItemId}
          sortOrder={sortOrder}
        />
        
        {/* Mobile Spine (Left) */}
        <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-gray-800" />
        <div className="space-y-4 md:space-y-0">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => {
              const isLeftTrack = item.category === 'work' || item.category === 'education';
              const spacerHeight = cardSpacers.get(item.id) || 0;

              return (
                <TimelineCard
                  key={item.id}
                  item={item}
                  isLeftTrack={isLeftTrack}
                  spacerHeight={spacerHeight}
                  cardRef={(el) => {
                    if (el) cardRefs.current.set(item.id, el);
                    else cardRefs.current.delete(item.id);
                  }}
                  setHoveredItemId={setHoveredItemId}
                  hoveredItemId={hoveredItemId}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

