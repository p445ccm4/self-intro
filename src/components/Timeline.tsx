import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { Category } from '../utils/timeline';
import { TimelineSpine } from './TimelineSpine';
import { useTimelineData } from '../hooks/useTimelineData';
import { TimelineSettings } from './TimelineSettings';
import { TimelineCard } from './TimelineCard';
import { useTimelineLayout } from '../hooks/useTimelineLayout';
import { connectorTransition } from '../utils/animations';

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const isSortingRef = useRef(false);

  // Filter now excludes milestones (they are always shown)
  const [filter, setFilter] = useState<Exclude<Category, 'milestone'> | 'all'>('all');
  const location = useLocation();
  const navigate = useNavigate();

  const { items: filteredItems, minDate, maxDate, laneCount, totalHeight } = useTimelineData(filter, sortOrder);

  const { cardSpacers, connectorPaths } = useTimelineLayout({
    items: filteredItems,
    minDate,
    maxDate,
    totalHeight,
    sortOrder,
    laneCount,
    containerRef,
    cardRefs,
  });

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
            <motion.path
              key={p.id}
              d={p.d}
              stroke={p.color}
              strokeWidth={hoveredItemId === p.id ? "2.5" : "1.5"}
              fill="none"
              opacity={hoveredItemId === p.id ? "1" : "0.3"}
              layout
              transition={connectorTransition}
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

