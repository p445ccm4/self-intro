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
  boxShadow: '0 0 15px rgba(59,130,246,0.15)',
  transition: springTransition,
};

// Variants for TimelineCard content (border and shadow)
export const cardContentVariants: Variants = {
  rest: {
    borderColor: 'var(--color-gray-800)',
    boxShadow: '0 0 0px rgba(59,130,246,0)',
  },
  hover: {
    borderColor: 'var(--color-gray-600)',
    ...cardHover, // Reuse cardHover for y-offset and boxShadow
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
