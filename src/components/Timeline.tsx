import { useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import type { Category } from '../utils/timeline';
import { TimelineSpine } from './TimelineSpine';
import { useTimelineData } from '../hooks/useTimelineData';
import { TimelineSettings } from './TimelineSettings';
import { TimelineCard } from './TimelineCard';
import { useTimelineLayout } from '../hooks/useTimelineLayout';
import { useHashScrollRestore } from '../hooks/useHashScrollRestore';
import { connectorTransition } from '../utils/animations';

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

  const clearHash = useCallback(() => {
    navigate({ pathname: location.pathname, search: location.search }, { replace: true });
  }, [navigate, location.pathname, location.search]);

  useHashScrollRestore({
    hash: location.hash.replace(/^#/, ''),
    layoutReady: cardSpacers.size > 0,
    onRestored: clearHash,
  });

  const toggleSort = () => {
    if (location.hash) {
      clearHash();
    }
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <section className="timeline-section py-16 md:py-20 px-4 max-w-7xl mx-auto relative overflow-hidden">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-4xl font-bold mb-6 solar-on-white">
          My Journey
        </h2>
        <TimelineSettings filter={filter} onFilterChange={setFilter} />
      </div>

      <div className="timeline-toolbar mb-3 md:mb-4">
        <button
          type="button"
          onClick={toggleSort}
          className="btn btn-sm btn-glass btn-icon timeline-sort-btn"
          aria-label={sortOrder === 'desc' ? 'Sort oldest first' : 'Sort newest first'}
          title={sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
        >
          {sortOrder === 'desc' ? <ArrowDown size={16} aria-hidden /> : <ArrowUp size={16} aria-hidden />}
        </button>
      </div>

      <div
        className="relative h-auto md:h-[var(--total-height)]"
        ref={containerRef}
        style={{ '--total-height': `${totalHeight}px` } as React.CSSProperties}
      >
        <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0">
          {connectorPaths.map((p) => (
            <motion.path
              key={p.id}
              d={p.d}
              stroke={p.color}
              strokeWidth={hoveredItemId === p.id ? '2.5' : '1.5'}
              fill="none"
              opacity={hoveredItemId === p.id ? '1' : '0.3'}
              layout
              transition={connectorTransition}
            />
          ))}
        </svg>

        <TimelineSpine
          items={filteredItems}
          minDate={minDate}
          maxDate={maxDate}
          laneCount={laneCount}
          hoveredItemId={hoveredItemId}
          setHoveredItemId={setHoveredItemId}
          sortOrder={sortOrder}
        />

        <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-bea-border" />
        <div className="space-y-4 md:space-y-0">
          <AnimatePresence mode="popLayout">
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
