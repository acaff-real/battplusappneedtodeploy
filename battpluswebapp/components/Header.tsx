// components/Header.tsx
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

// ... (SVG Icons for Sun and Moon)
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);


export default function Header() {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // This effect runs once on mount to set the initial theme and mounted state
  useEffect(() => {
    // For now, we'll default to dark. A real app might check localStorage
    setMounted(true);
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  };

  // Avoid rendering the button until the component has mounted
  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch
    return null; 
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-3xl font-bold text-teal-600 dark:text-teal-500">
            battplus
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#" className="font-semibold text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-500">News</Link>
            <Link href="#" className="font-semibold text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-500">Grid Scale</Link>
            <Link href="#" className="font-semibold text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-500">Distributed</Link>
            <Link href="#" className="font-semibold text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-500">Features</Link>
            <Link href="#" className="font-semibold text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-500">Market Analysis</Link>
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}