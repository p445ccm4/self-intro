import { Briefcase, Code, GraduationCap, Zap } from 'lucide-react';
import type { Category } from './timeline';

export const SPINE_LAYOUT = {
  LANE_WIDTH: 6,
  LANE_GAP: 8,
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
    case 'work': return 'text-bea-blue bg-bea-blue/10 border-bea-blue/20';
    case 'project': return 'text-solar-red bg-solar-red/10 border-solar-red/20';
    case 'education': return 'text-bea-teal bg-bea-emerald/15 border-bea-emerald/30';
    case 'milestone': return 'text-[color:var(--bea-warning-amber)] bg-solar-yellow/20 border-solar-yellow/40';
  }
};

export const getPillColor = (category: Category) => {
  switch (category) {
    case 'work': return 'bg-bea-blue';
    case 'project': return 'bg-solar-red';
    case 'education': return 'bg-bea-emerald';
    case 'milestone': return 'bg-solar-yellow';
  }
};

export const getGradient = (category: Category) => {
  switch (category) {
    case 'work': return 'from-bea-blue/8 via-transparent to-transparent';
    case 'project': return 'from-solar-red/8 via-transparent to-transparent';
    case 'education': return 'from-bea-emerald/10 via-transparent to-transparent';
    case 'milestone': return 'from-solar-yellow/15 via-transparent to-transparent';
  }
};

export const getConnectorColor = (category: Category) => {
  switch (category) {
    case 'work': return '#0563C1'; // bea-hyperlink-blue
    case 'project': return '#ED171F'; // bea-primary-red
    case 'education': return '#29BA74'; // bea-emerald-green
    case 'milestone': return '#FFCC00'; // bea-golden-yellow
  }
};

export const getSubtitleColor = (category: Category) => {
  switch (category) {
    case 'work': return 'text-bea-blue';
    case 'project': return 'text-solar-red-orange';
    case 'education': return 'text-bea-teal';
    case 'milestone': return 'text-[color:var(--bea-warning-amber)]';
  }
};
