import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { type TimelineItem, type Category, SPINE_LAYOUT } from '../utils/timeline';

interface TimelineSpineProps {
  items: TimelineItem[];
  minDate: Date;
  maxDate: Date;
  laneCount: number;
  hoveredItemId: string | null;
  setHoveredItemId: (id: string | null) => void;
  sortOrder: 'asc' | 'desc';
}

export const TimelineSpine = ({ items, minDate, maxDate, laneCount, hoveredItemId, setHoveredItemId, sortOrder }: TimelineSpineProps) => {
  const navigate = useNavigate();
  const totalDuration = maxDate.getTime() - minDate.getTime();

  const getPosition = (date: Date) => {
    let pos;
    if (sortOrder === 'desc') {
      // Descending: MaxDate (Newest) at top (0%), MinDate (Oldest) at bottom (100%)
      pos = ((maxDate.getTime() - date.getTime()) / totalDuration) * 100;
    } else {
      // Ascending: MinDate (Oldest) at top (0%), MaxDate (Newest) at bottom (100%)
      pos = ((date.getTime() - minDate.getTime()) / totalDuration) * 100;
    }
    return Math.max(0, Math.min(100, pos)); // Clamp between 0 and 100
  };

  const getHeight = (start: Date, end: Date | 'Present') => {
    const endDate = end === 'Present' ? new Date() : end;
    const duration = endDate.getTime() - start.getTime();
    const height = (duration / totalDuration) * 100;
    return Math.max(height, 0.2); // Ensure minimal visibility
  };

  const getPillColor = (category: Category) => {
    switch (category) {
      case 'work': return 'bg-blue-500';
      case 'project': return 'bg-purple-500';
      case 'education': return 'bg-green-500';
      case 'milestone': return 'bg-yellow-500';
    }
  };

  // Calculate lane width and spacing
  const { LANE_WIDTH, LANE_GAP } = SPINE_LAYOUT;
  const TOTAL_WIDTH = laneCount * LANE_WIDTH + (laneCount - 1) * LANE_GAP;

  // Generate Time Markers (Years and Quarters)
  const startYear = minDate.getFullYear();
  const endYear = maxDate.getFullYear();
  
  const markers = [];
  for (let year = endYear; year >= startYear; year--) {
    // Add quarters: Jan (0), Apr (3), Jul (6), Oct (9)
    for (let month = 0; month < 12; month += 3) {
      const date = new Date(year, month, 1);
      if (date < minDate || date > maxDate) continue;
      markers.push({ date, year, month });
    }
  }

  return (
    <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-full hidden md:flex justify-center h-full pointer-events-none z-0">
       {/* Time Markers (Full Width) */}
       <div className="absolute inset-0 w-full">
          {markers.map(({ date, year, month }) => {
            const top = getPosition(date);
            const isYearStart = month === 0;
            
            return (
              <div
                key={`${year}-${month}`}
                className="absolute w-full flex items-center justify-center"
                style={{ top: `${top}%` }}
              >
                <div className={`w-full h-px ${isYearStart ? 'bg-gray-800/50' : 'bg-gray-800/30'}`} />
                {isYearStart && (
                  <span className="absolute z-30 bg-gray-900 px-2 py-1 rounded-full text-xs font-mono text-gray-500 border border-gray-800">
                    {year}
                  </span>
                )}
              </div>
            );
          })}
       </div>

       {/* Container for lanes */}
       <div className="relative h-full" style={{ width: TOTAL_WIDTH }}>
          {/* Render Lane Lines (Background) */}
          {Array.from({ length: laneCount }).map((_, i) => (
            <div
              key={`lane-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gray-800/30"
              style={{
                left: i * (LANE_WIDTH + LANE_GAP) + LANE_WIDTH / 2
              }}
            />
          ))}

          {/* Render Pills */}
          {items.map((item) => {
             const endDate = item.endDate === 'Present' ? new Date() : item.endDate;
             
             // In Descending mode, we align to End Date (Newest at top)
             // In Ascending mode, we align to Start Date (Oldest at top)
             const alignDate = sortOrder === 'desc' ? endDate : item.startDate;
             const top = getPosition(alignDate);
             
             const height = getHeight(item.startDate, item.endDate);
             const laneIndex = item.lane || 0;
             
             const leftPos = laneIndex * (LANE_WIDTH + LANE_GAP);

             const isHovered = hoveredItemId === item.id;

             return (
               <motion.div
                 key={`spine-wrapper-${item.id}`}
                 className="absolute z-10 pointer-events-none"
                 style={{
                   top: `${top}%`,
                   height: `${height}%`,
                   width: `${LANE_WIDTH}px`,
                   left: leftPos,
                 }}
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true, amount: 0, margin: "200px" }}
               >
                 <motion.div
                   className={`w-full h-full rounded-full ${getPillColor(item.category)} transition-shadow duration-300 pointer-events-auto ${item.link ? 'cursor-pointer' : ''} ${isHovered ? 'shadow-[0_0_12px_currentColor]' : ''}`}
                   variants={{
                     hidden: { opacity: 0, scaleY: 0 },
                     visible: { opacity: 1, scaleY: 1 }
                   }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                   onClick={() => item.link && navigate(item.link)}
                   onMouseEnter={() => setHoveredItemId(item.id)}
                   onMouseLeave={() => setHoveredItemId(null)}
                 />
               </motion.div>
             );
          })}
       </div>
    </div>
  );
};
