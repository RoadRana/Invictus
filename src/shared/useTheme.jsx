import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme'; 

function getSystem() {
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function useTheme() {
  const [mode, setMode] = useState(
    () => localStorage.getItem(STORAGE_KEY) || getSystem()
  );

  // apply to <html>
  useEffect(() => {
    const el = document.documentElement;
    el.classList.remove('light', 'dark');
    el.classList.add(mode);
    el.style.colorScheme = mode;
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggle = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));

  return { mode, toggle };
}
