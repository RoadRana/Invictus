
import { useTheme } from './useTheme';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const { mode, toggle } = useTheme();
  const isDark = mode === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className="
        inline-flex items-center justify-center
        h-10 w-10 rounded-xl
        bg-[var(--surface)]/90 backdrop-blur
        border border-white/10
        text-primary
        hover:bg-white/6 transition-colors shadow-soft
      "
    >
      <span
        className={`
          transition-transform duration-300 will-change-transform
          ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-90'}
        `}
      >
        {isDark ? <FaSun /> : <FaMoon />}
      </span>
    </button>
  );
}
