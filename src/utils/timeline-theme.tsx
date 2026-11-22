import { Briefcase, Code, GraduationCap, Zap } from 'lucide-react';
import type { Category } from './timeline';

export const SPINE_LAYOUT = {
  LANE_WIDTH: 6,
  LANE_GAP: 8,
};

export const CATEGORY_COLORS: Record<Category, string> = {
  work: '#CCCAFF',
  project: '#FFC2C0',
  education: '#9EFF9C',
  milestone: '#FFD863',
};

export const getIcon = (category: Category, size = 16) => {
  switch (category) {
    case 'work': return <Briefcase size={size} />;
    case 'project': return <Code size={size} />;
    case 'education': return <GraduationCap size={size} />;
    case 'milestone': return <Zap size={size} />;
  }
};

export const getCategoryColor = (category: Category) => {
  switch (category) {
    case 'work':
      return 'text-[color:var(--cat-work-fg)] bg-[color:color-mix(in_srgb,var(--cat-work)_18%,transparent)] border-[color:color-mix(in_srgb,var(--cat-work)_32%,transparent)]';
    case 'project':
      return 'text-[color:var(--cat-project-fg)] bg-[color:color-mix(in_srgb,var(--cat-project)_18%,transparent)] border-[color:color-mix(in_srgb,var(--cat-project)_32%,transparent)]';
    case 'education':
      return 'text-[color:var(--cat-education-fg)] bg-[color:color-mix(in_srgb,var(--cat-education)_18%,transparent)] border-[color:color-mix(in_srgb,var(--cat-education)_32%,transparent)]';
    case 'milestone':
      return 'text-[color:var(--cat-milestone-fg)] bg-[color:color-mix(in_srgb,var(--cat-milestone)_20%,transparent)] border-[color:color-mix(in_srgb,var(--cat-milestone)_36%,transparent)]';
  }
};

export const getPillColor = (category: Category) => {
  switch (category) {
    case 'work': return 'bg-[color:var(--cat-work)]';
    case 'project': return 'bg-[color:var(--cat-project)]';
    case 'education': return 'bg-[color:var(--cat-education)]';
    case 'milestone': return 'bg-[color:var(--cat-milestone)]';
  }
};

export const getGradient = (category: Category) => {
  switch (category) {
    case 'work': return 'from-[color:color-mix(in_srgb,var(--cat-work)_22%,transparent)] via-transparent to-transparent';
    case 'project': return 'from-[color:color-mix(in_srgb,var(--cat-project)_22%,transparent)] via-transparent to-transparent';
    case 'education': return 'from-[color:color-mix(in_srgb,var(--cat-education)_22%,transparent)] via-transparent to-transparent';
    case 'milestone': return 'from-[color:color-mix(in_srgb,var(--cat-milestone)_24%,transparent)] via-transparent to-transparent';
  }
};

export const getConnectorColor = (category: Category) => CATEGORY_COLORS[category];

export const getSubtitleColor = (category: Category) => {
  switch (category) {
    case 'work': return 'text-[color:var(--cat-work-fg)]';
    case 'project': return 'text-[color:var(--cat-project-fg)]';
    case 'education': return 'text-[color:var(--cat-education-fg)]';
    case 'milestone': return 'text-[color:var(--cat-milestone-fg)]';
  }
};
