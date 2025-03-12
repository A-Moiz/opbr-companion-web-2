'use client';

import { useEffect, useState } from 'react';

export default function useTheme() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ✅ Ensure it's mounted before rendering

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem('theme') === 'dark';
    setDarkMode(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  return { darkMode: isMounted ? darkMode : false, toggleDarkMode }; // ✅ Only return darkMode after mounting
}
