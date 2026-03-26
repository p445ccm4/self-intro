import { useState, useEffect, useMemo, useRef } from 'react';
import type { TimelineItem } from '../utils/timeline';
import { calculateTimelineLayout, type ConnectorPath } from '../utils/timeline-layout';

interface TimelineLayoutProps {
  items: TimelineItem[];
  minDate: Date;
  maxDate: Date;
  totalHeight: number;
  sortOrder: 'asc' | 'desc';
  laneCount: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.RefObject<Map<string, HTMLDivElement>>;
}

export const useTimelineLayout = ({
  items,
  minDate,
  maxDate,
  totalHeight,
  sortOrder,
  laneCount,
  containerRef,
  cardRefs,
}: TimelineLayoutProps) => {
  const [layout, setLayout] = useState<{
    cardSpacers: Map<string, number>;
    connectorPaths: ConnectorPath[];
  }>({
    cardSpacers: new Map(),
    connectorPaths: [],
  });

  // Cache for card dimensions to avoid layout thrashing
  const dimensionsCache = useRef<Map<string, { width: number; height: number; offsetLeft: number; offsetTop: number }>>(new Map());

  useEffect(() => {
    let rafId: number;
    
    const updateLayout = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        
        // Only read from DOM if we don't have it in cache or if we need a fresh read
        // In a real app, we'd invalidate this cache via ResizeObserver
        items.forEach((item) => {
          const cardEl = cardRefs.current.get(item.id);
          if (cardEl) {
            let currentEl: HTMLElement | null = cardEl;
            let relativeLeft = 0;
            let relativeTop = 0;

            while (currentEl && currentEl !== containerRef.current) {
              relativeLeft += currentEl.offsetLeft;
              relativeTop += currentEl.offsetTop;
              currentEl = currentEl.offsetParent as HTMLElement;
            }

            dimensionsCache.current.set(item.id, {
              width: cardEl.offsetWidth,
              height: cardEl.offsetHeight,
              offsetLeft: relativeLeft,
              offsetTop: relativeTop,
            });
          }
        });

        const newLayout = calculateTimelineLayout({
          items,
          minDate,
          maxDate,
          totalHeight,
          sortOrder,
          laneCount,
          containerWidth: containerRect.width,
          containerHeight: containerRect.height,
          cardDimensions: dimensionsCache.current,
        });

        setLayout(newLayout);
      });
    };

    updateLayout();

    window.addEventListener('resize', updateLayout);

    const observer = new ResizeObserver((entries) => {
      // Invalidate specific items that changed size
      entries.forEach(entry => {
        const id = Array.from(cardRefs.current.entries()).find(([_, el]) => el === entry.target)?.[0];
        if (id) {
          // We'll let the next updateLayout call refresh the cache for this ID
        }
      });
      updateLayout();
    });

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    const timer = setTimeout(updateLayout, 500);

    return () => {
      window.removeEventListener('resize', updateLayout);
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [items, minDate, maxDate, totalHeight, sortOrder, laneCount, containerRef, cardRefs]);

  return useMemo(() => layout, [layout]);
};
