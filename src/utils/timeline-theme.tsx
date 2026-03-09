import { Briefcase, Code, GraduationCap, Zap } from 'lucide-react';
import type { Category } from './timeline';

export const SPINE_LAYOUT = {
  LANE_WIDTH: 6,
  LANE_GAP: 8,
};

export const getIcon = (category: Category) => {
  switch (category) {
    case 'work': return <Briefcase size={18} />;
    case 'project': return <Code size={18} />;
    case 'education': return <GraduationCap size={18} />;
    case 'milestone': return <Zap size={18} />;
  }
};

export const getCategoryColor = (category: Category) => {
  switch (category) {
    case 'work': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'project': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    case 'education': return 'text-green-400 bg-green-400/10 border-green-400/20';
    case 'milestone': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
  }
};

export const getPillColor = (category: Category) => {
  switch (category) {
    case 'work': return 'bg-blue-500';
    case 'project': return 'bg-purple-500';
    case 'education': return 'bg-green-500';
    case 'milestone': return 'bg-yellow-500';
  }
};

export const getGradient = (category: Category) => {
  switch (category) {
    case 'work': return 'from-blue-500/5 via-transparent to-transparent';
    case 'project': return 'from-purple-500/5 via-transparent to-transparent';
    case 'education': return 'from-green-500/5 via-transparent to-transparent';
    case 'milestone': return 'from-yellow-500/5 via-transparent to-transparent';
  }
};

export const getConnectorColor = (category: Category) => {
  switch (category) {
    case 'work': return '#60a5fa'; // blue-400
    case 'project': return '#c084fc'; // purple-400
    case 'education': return '#4ade80'; // green-400
    case 'milestone': return '#facc15'; // yellow-400
  }
};
