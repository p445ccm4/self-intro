import type { Variants, Transition } from 'framer-motion';

// Define common spring transitions for responsiveness
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// Variants for TimelineCard entry
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springTransition,
    },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// Variants for TimelineSpine pill entry
export const pillVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      ...springTransition,
      delay: 0.2, // Or use staggerChildren on parent
    },
  },
};

// Hover animation for cards
export const cardHover = {
  y: -4,
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 4px 10px -4px rgba(237, 23, 31, 0.08)',
  transition: springTransition,
};

// Variants for TimelineCard content (border and shadow)
export const cardContentVariants: Variants = {
  rest: {
    borderColor: 'var(--bea-border-light)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
  },
  hover: {
    borderColor: 'var(--bea-border-strong)',
    ...cardHover,
  }
};

// Variants for TimelineSpine pill hover effect
export const pillHoverVariants: Variants = {
  rest: { boxShadow: '0 0 0px currentColor' },
  hover: {
    boxShadow: '0 0 12px currentColor',
    transition: { duration: 0.3 }
  }
};

// Variants for TimelineCard hover gradient background
export const hoverGradientVariants: Variants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

// Variants for TimelineCard category text expansion
export const categoryTextVariants: Variants = {
  collapsed: { maxWidth: 0, opacity: 0 },
  expanded: {
    maxWidth: 100,
    opacity: 1,
    transition: springTransition
  }
};

// Transition for Timeline connector lines
export const connectorTransition: Transition = {
  d: { duration: 0.5, ease: 'easeInOut' },
  strokeWidth: { duration: 0.3 },
  opacity: { duration: 0.3 },
};
