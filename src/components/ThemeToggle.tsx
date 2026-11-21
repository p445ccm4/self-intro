import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../utils/theme';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
    >
      <Sun size={14} className="theme-toggle-icon theme-toggle-icon-sun" aria-hidden />
      <Moon size={14} className="theme-toggle-icon theme-toggle-icon-moon" aria-hidden />
      <span className="theme-toggle-thumb" aria-hidden />
    </button>
  );
};
