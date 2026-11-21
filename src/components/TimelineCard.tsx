import { memo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatShortPeriod, type TimelineItem } from '../utils/timeline';
import { getCategoryColor, getIcon, getPillColor, getGradient, getSubtitleColor } from '../utils/timeline-theme';
import { cn } from '../utils/cn';
import { cardVariants, cardContentVariants, hoverGradientVariants, categoryTextVariants, springTransition } from '../utils/animations';

interface TimelineCardProps {
  item: TimelineItem;
  isLeftTrack: boolean;
  spacerHeight: number;
  cardRef: (el: HTMLDivElement | null) => void;
  setHoveredItemId: (id: string | null) => void;
  hoveredItemId: string | null;
}

export const TimelineCard = memo(({ item, isLeftTrack, spacerHeight, cardRef, setHoveredItemId, hoveredItemId }: TimelineCardProps) => {
  const navigate = useNavigate();
  const isHovered = hoveredItemId === item.id;
  const shortDate = formatShortPeriod(item.dateString);

  return (
    <motion.div
      id={item.id}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      exit="exit"
      layout
      style={{
        '--spacer-height': `${spacerHeight}px`,
        contain: 'layout style'
      } as React.CSSProperties}
      className={cn(
        "relative md:flex items-center mt-0 md:mt-[var(--spacer-height)] pointer-events-none will-change-[transform]",
        isLeftTrack ? "justify-start md:pr-[50%]" : "justify-end md:pl-[50%]"
      )}
    >
      {/* Mobile Dot */}
      <div className={cn(
        "md:hidden absolute left-6 w-3 h-3 rounded-full transform -translate-x-1/2 mt-6 z-10 border-2 border-bea-canvas",
        getPillColor(item.category)
      )} />

      {/* Content Card */}
      <div className={cn(
        "w-full pl-12 md:pl-0 md:text-left",
        isLeftTrack ? "md:pr-24" : "md:pl-24"
      )}>
        <motion.div
          ref={cardRef}
          variants={cardContentVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
          whileHover="hover"
          className={cn(
            "group relative glass-panel p-5 md:p-6 transition-colors cursor-pointer overflow-hidden pointer-events-auto",
            isHovered && "border-bea-border-strong"
          )}
          onClick={() => item.link && navigate(item.link, { state: { scrollToId: item.id } })}
          onMouseEnter={() => setHoveredItemId(item.id)}
          onMouseLeave={() => setHoveredItemId(null)}
        >
          <motion.div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              getGradient(item.category)
            )}
            variants={hoverGradientVariants}
            initial="initial"
            animate={isHovered ? "visible" : "hidden"}
            whileHover="visible"
          />

          <div className="relative z-10 flex flex-col md:items-start">
            {/* Meta row: date + duration + category stay on one baseline */}
            <div className="timeline-card-meta mb-2">
              <div className="timeline-card-meta-main">
                <span className="timeline-card-date">
                  <Calendar size={12} className="shrink-0" aria-hidden />
                  <span className="truncate">{shortDate}</span>
                </span>
                {item.duration && (
                  <span className="tag tag-neutral shrink-0">
                    {item.duration}
                  </span>
                )}
              </div>
              <motion.div
                className={cn(
                  "timeline-card-category shrink-0 border",
                  getCategoryColor(item.category)
                )}
                layout
                transition={springTransition}
              >
                <motion.span
                  className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap overflow-hidden"
                  variants={categoryTextVariants}
                  initial="collapsed"
                  animate={isHovered ? "expanded" : "collapsed"}
                >
                  {item.category}
                </motion.span>
                {getIcon(item.category)}
              </motion.div>
            </div>

            <h3 className={cn(
              "text-lg font-bold transition-colors flex items-center gap-2 text-bea-text-strong",
              isHovered && "text-solar-red"
            )}>
              {item.title}
              {item.link && (
                <ChevronRight
                  size={16}
                  className={cn(
                    "transition-all text-solar-red shrink-0",
                    isHovered
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  )}
                />
              )}
            </h3>
            <div className={cn("flex items-center gap-2 mt-1", getSubtitleColor(item.category))}>
              <span className="text-sm font-medium">{item.subtitle}</span>
            </div>

            {item.description && (
              <div className="mt-4 text-bea-text-primary text-sm leading-relaxed line-clamp-3 md:text-left">
                {Array.isArray(item.description) ? (
                  <ul className="space-y-1 list-disc list-inside">
                    {item.description.slice(0, 2).map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.description}</p>
                )}
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 md:justify-start">
                {item.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="tag tag-neutral">
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-xs px-2 py-1 text-bea-text-secondary">+{item.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});
