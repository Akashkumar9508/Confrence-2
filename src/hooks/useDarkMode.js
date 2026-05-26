import { useEffect } from 'react';

export default function useDarkMode() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  return ['light', () => {}];
}

